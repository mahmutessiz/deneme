import { StatusBar } from 'expo-status-bar';
import { Button, Platform, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useStyles } from 'react-native-unistyles';

import { startTimerNotification, stopTimerNotification } from '../components/backgroundTimer';

import CounterTracker from '~/components/tryNotCounter';

export default function ModalScreen() {
  const data = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 5 },
    { value: 10 },
    { value: 20 },
    { value: 60 },
    { value: 100 },
    { value: 120 },
    { value: 124 },
    { value: 125 },
  ];
  const { theme } = useStyles();

  return (
    <View style={theme.components.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text style={theme.components.title}>Progress Chart</Text>
      <View
        style={{
          width: '100%',
          position: 'relative',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <LineChart
          data={data}
          data2={[
            { value: 2 },
            { value: 4 },
            { value: 8 },
            { value: 10 },
            { value: 15 },
            { value: 20 },
            { value: 25 },
            { value: 30 },
            { value: 35 },
            { value: 40 },
            { value: 50 },
            { value: 60 },
            { value: 70 },
            { value: 80 },
            { value: 90 },
            { value: 100 },
            { value: 110 },
            { value: 120 },
            { value: 125 },
            { value: 126 },
            { value: 127 },
            { value: 128 },
            { value: 120 },
          ]}
          dataPointsColor2="teal"
          backgroundColor="rgba(0, 0, 0, 0.1)"
          hideDataPoints1
          color1="rgba(0, 0, 0, 0.5)"
          color2="black"
          width={350}
          xAxisLabelTexts={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          xAxisLabelTextStyle={{ color: 'red' }}
          hideYAxisText
          adjustToWidth
          curved
          areaChart2
          startFillColor="rgb(46, 217, 255)"
          startOpacity={0.8}
          endFillColor="rgb(203, 241, 250)"
          endOpacity={0.3}
          spacing1={30}
          spacing2={data.length}
        />
        <Text
          style={{
            width: 110,
            textAlign: 'left',
            alignSelf: 'flex-start',
            padding: 10,
            gap: 5,
          }}>
          1. Start 2. Basics 3. Basics Mastery 4. Mastery 5. End
        </Text>
      </View>
      <CounterTracker />
      <Button title="start" color="teal" onPress={() => startTimerNotification(() => '0:00')} />
      <Button title="stop" color="red" onPress={() => stopTimerNotification()} />
    </View>
  );
}
