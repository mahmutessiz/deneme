import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { MMKV } from 'react-native-mmkv';

export default function TaskSelect() {
  const storage = new MMKV();

  const [text, setText] = useState('');
  const [selectedInterval, setSelectedInterval] = useState('3');
  const [selectedExcuses, setSelectedExcuses] = useState('4');

  const handleTextChange = (inputText: string) => {
    console.log({ name: text, interval: selectedInterval, excuses: selectedExcuses });
    storage.set(
      'achivements',
      JSON.stringify({ name: text, interval: selectedInterval, excuses: selectedExcuses })
    );
  };
  const getStorefn = () => {
    const deneme = storage.getString('achivements');
    console.log(deneme);
  };
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        padding: 50,
        backgroundColor: 'white',
      }}>
      <Text>Task Name</Text>
      <TextInput
        style={{
          height: 40,
          marginBottom: 12,
          borderWidth: 1,
          padding: 10,
          width: 300,
          borderRadius: 10,
        }}
        placeholder="Task Name"
        value={text}
        onChangeText={setText}
      />
      <Text>Task interval</Text>
      <Picker
        style={{
          height: 40,
          marginBottom: 12,
          padding: 10,
          width: 300,
          backgroundColor: 'lightblue',
        }}
        selectedValue={selectedInterval}
        onValueChange={(itemValue, itemIndex) => setSelectedInterval(itemValue)}>
        <Picker.Item label="1 time a week" value="1" />
        <Picker.Item label="2 times a week" value="2" />
        <Picker.Item label="3 times a week" value="3" />
        <Picker.Item label="4 times a week" value="4" />
      </Picker>

      <Text>Excuses</Text>
      <Picker
        style={{
          height: 40,
          marginBottom: 12,
          padding: 10,
          width: 300,
          backgroundColor: 'lightblue',
        }}
        selectedValue={selectedInterval}
        onValueChange={(itemValue, itemIndex) => setSelectedExcuses(itemValue)}>
        <Picker.Item label="1 time a week" value="1" />
        <Picker.Item label="2 times a week" value="2" />
        <Picker.Item label="3 times a week" value="3" />
        <Picker.Item label="4 times a week" value="4" />
      </Picker>

      <Button
        title="Submit"
        onPress={() => {
          handleTextChange(text);
        }}
      />
      <Button
        title="getStore"
        onPress={() => {
          getStorefn();
        }}
      />
    </View>
  );
}
