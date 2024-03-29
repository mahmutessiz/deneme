import { BlurView } from '@react-native-community/blur';
import TaskSelect from 'components/taskSelect';
import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { useStyles } from 'react-native-unistyles';
export default function TabOneScreen() {
  const { theme } = useStyles();

  return (
    <>
      <View>
        <Text style={theme.components.title}>Achivements</Text>
      </View>
      <TaskSelect />
      <View style={styles.container}>
        <Image
          key="blurryImage"
          source={{ uri: 'https://picsum.photos/500/300' }}
          style={styles.absolute}
        />
        <Text style={styles.absolute}>Hi, I am some blurred text</Text>
        {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
