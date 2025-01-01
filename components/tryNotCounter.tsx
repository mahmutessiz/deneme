// Counter

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, AppState } from 'react-native';

// Helper function to get/set values in AsyncStorage

const COUNTER_TASK_NAME = 'COUNTER_TRACKING';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Define the background task
TaskManager.defineTask(COUNTER_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }

  // Get the stored counter value
  const storedCount = await getValue();

  // Schedule a notification with the current count
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Counter Status',
      body: `Current counter value: ${storedCount}`,
    },
    trigger: null,
  });

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

const getValue = async () => {
  try {
    const value = await AsyncStorage.getItem('counter');
    return value ? parseInt(value) : 0;
  } catch (e) {
    console.error('Error getting value:', e);
    return 0;
  }
};

const setValue = async (value) => {
  try {
    await AsyncStorage.setItem('counter', value.toString());
  } catch (e) {
    console.error('Error setting value:', e);
  }
};

export default function CounterTracker() {
  const [count, setCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Initialize counter from storage
    getValue().then(setCount);

    // Request notification permissions
    requestPermissions();

    // Handle app state changes
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // App has come to foreground
        getValue().then(setCount);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const requestPermissions = async () => {
    // Request notifications permission
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Register background fetch
    await registerBackgroundFetch();
  };

  const registerBackgroundFetch = async () => {
    try {
      await BackgroundFetch.registerTaskAsync(COUNTER_TASK_NAME, {
        minimumInterval: 1, // 1 second
        stopOnTerminate: false,
        startOnBoot: true,
      });
      setIsTracking(true);
    } catch (err) {
      console.error('Task Registration failed:', err);
    }
  };

  const incrementCounter = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await setValue(newCount);
  };

  const decrementCounter = async () => {
    const newCount = count - 1;
    setCount(newCount);
    await setValue(newCount);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 48, marginBottom: 20 }}>{count}</Text>
      <View style={{ flexDirection: 'row', gap: 20 }}>
        <Button title="Decrement" onPress={decrementCounter} />
        <Button title="Increment" onPress={incrementCounter} />
      </View>
      <Text style={{ marginTop: 20 }}>
        {isTracking ? 'Counter is being tracked' : 'Setting up tracking...'}
      </Text>
    </View>
  );
}
