import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  const { styles } = useStyles(stylesheet);

  return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />;
}

export default function TabLayout() {
  //const { styles } = useStyles(stylesheet);

  return (
    <Tabs
      screenOptions={{
        headerStatusBarHeight: 20,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarActiveBackgroundColor: 'green',
          tabBarActiveTintColor: 'black',
          headerTintColor: 'black',
          tabBarIcon: ({ color }) => <TabBarIcon name="rocket" color={color} />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerLeft: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="bars"
                    size={25}
                    color="black"
                    style={[{ marginLeft: 10 }, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
          tabBarActiveTintColor: 'black',
          tabBarActiveBackgroundColor: 'yellow',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Tab Three',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'white',
          },
          tabBarActiveTintColor: 'white',
          tabBarActiveBackgroundColor: 'blue',
          tabBarIcon: ({ color }) => <TabBarIcon name="check" color={color} />,
        }}
      />
    </Tabs>
  );
}

const stylesheet = createStyleSheet({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
