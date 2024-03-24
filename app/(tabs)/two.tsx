import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import data from '../../data/data.json';

export default function TabTwoScreen() {
  const { theme } = useStyles();
  const tasksArray = Object.keys(data);

  return (
    <View style={theme.components.container}>
      <Text style={theme.components.title}>Status: In Progress</Text>
      <FlatList
        style={styles.container}
        data={tasksArray}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                padding: 10,
                fontSize: 18,
                height: 44,
                backgroundColor: 'rebeccapurple',
                margin: 5,
                color: 'white',
              }}>
              {item}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'white',
    width: '100%',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
