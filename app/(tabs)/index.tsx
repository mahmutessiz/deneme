import TaskSelect from 'components/taskSelect';
import { Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

export default function TabOneScreen() {
  const { theme } = useStyles();

  return (
    <>
      <View>
        <Text style={theme.components.title}>Achivements</Text>
      </View>
      <TaskSelect />
    </>
  );
}
