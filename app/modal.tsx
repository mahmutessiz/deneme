import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

export default function ModalScreen() {
  const { theme } = useStyles();

  return (
    <View style={theme.components.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text style={theme.components.title}>Settings</Text>
    </View>
  );
}
