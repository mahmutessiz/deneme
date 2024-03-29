import { Pressable, Text, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { useStyles } from 'react-native-unistyles';

// import EditScreenInfo from '../../components/edit-screen-info';
import Notify from '~/components/notify';

export default function TabOneScreen() {
  const storage2 = new MMKV({
    id: 'three',
  });

  const saveObject = {
    name: 'deneme',
    age: 25,
    address: {
      city: 'istanbul',
      country: 'turkey',
    },
  };

  const setStorefn = async (val: object) => {
    storage2.set('user.name', JSON.stringify(val));
  };

  const getStorefn = async () => {
    const stringValue = storage2.getString('user.name');
    if (stringValue !== undefined) {
      const objValue = JSON.parse(stringValue);
      return console.log(objValue);
    } else {
      alert('no value');
    }
  };

  /**
   * An asynchronous function that sets the value in the store and then retrieves it,
   * triggering an alert with the retrieved value.
   *
   * @param {string} value - the value to be set in the store
   * @return {Promise<void>} a Promise that resolves when the function completes
   */
  const getAndSet = async (value: object): Promise<void> => {
    await setStorefn(value);
    await getStorefn();
  };

  const { theme } = useStyles();

  return (
    <View style={theme.components.container}>
      <Text style={theme.components.title}>Completed tasks</Text>

      <Pressable onPress={() => getAndSet(saveObject)}>
        <Text style={theme.components.buttonStyle}>alert</Text>
      </Pressable>
      <Notify />
    </View>
  );
}