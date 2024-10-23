import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useStyles } from 'react-native-unistyles';

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
      <LineChart
        data={data}
        data2={[{ value: 2 }, { value: 4 }, { value: 8 }, { value: 10 }, { value: 15 }]}
        dataPointsColor2="teal"
        backgroundColor="rgba(0, 0, 0, 0.1)"
        width={300}
        adjustToWidth
        curved
      />
    </View>
  );
}
