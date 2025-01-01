// import * as Notifications from 'expo-notifications';
// import { Platform } from 'react-native';

// // Configure notifications
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// let notificationInterval: NodeJS.Timer | null = null;

// // Function to update the notification
// async function updateTimerNotification(timeSpent: string) {
//   try {
//     // Create notification channel for Android
//     if (Platform.OS === 'android') {
//       await Notifications.setNotificationChannelAsync('timer', {
//         name: 'Timer Updates',
//         importance: Notifications.AndroidImportance.LOW,
//         vibrationPattern: [0, 0, 0, 0],
//         lightColor: '#FF231F7C',
//       });
//     }

//     // Cancel any existing notification
//     await Notifications.dismissAllNotificationsAsync();

//     // Schedule new notification
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: 'Skill Timer',
//         body: `Time spent: ${timeSpent}`,
//       },
//       trigger: null,
//     });
//   } catch (error) {
//     console.error('Error updating notification:', error);
//   }
// }

// // Start showing timer notifications
// export function startTimerNotification(getTimeSpent: () => string) {
//   // Update notification every second
//   notificationInterval = setInterval(() => {
//     updateTimerNotification(getTimeSpent());
//   }, 1000);
// }

// // Stop showing timer notifications
// export function stopTimerNotification() {
//   if (notificationInterval) {
//     clearInterval(notificationInterval);
//     notificationInterval = null;
//   }
//   Notifications.dismissAllNotificationsAsync();
// }

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notifications to prevent creating new notification windows
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

let notificationInterval: NodeJS.Timer | null = null;
let startTime: number | null = null;

// Format elapsed time as MM:SS
function formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Function to update the persistent notification
async function updateNotificationContent() {
  if (!startTime) return;

  const elapsedTime = Date.now() - startTime;
  const timeString = formatTime(elapsedTime);

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Skill Timer',
        body: `Time spent: ${timeString}`,
        sticky: true,
      },
      trigger: null,
      identifier: 'persistent-timer', // Use same identifier to update existing notification
    });
  } catch (error) {
    console.error('Error updating notification:', error);
  }
}

// Start the timer notification
export async function startTimerNotification() {
  try {
    // Create notification channel for Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('timer', {
        name: 'Timer Updates',
        importance: Notifications.AndroidImportance.LOW,
        vibrationPattern: [0, 0, 0, 0],
        lightColor: '#FF231F7C',
      });
    }

    // Set start time and create initial notification
    startTime = Date.now();
    await updateNotificationContent();

    // Update notification content every second
    notificationInterval = setInterval(updateNotificationContent, 1000);
  } catch (error) {
    console.error('Error starting timer notification:', error);
  }
}

// Stop the timer notification
export async function stopTimerNotification() {
  if (notificationInterval) {
    clearInterval(notificationInterval);
    notificationInterval = null;
  }
  startTime = null;
  await Notifications.dismissAllNotificationsAsync();
}
