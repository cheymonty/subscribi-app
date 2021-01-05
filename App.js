import 'react-native-gesture-handler'
import React, {useState, useEffect, useRef} from 'react'
import {Platform} from 'react-native'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Add from './pages/Add'
import Statistics from './pages/Statistics'
import { Provider as PaperProvider } from 'react-native-paper'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const Tab = createBottomTabNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [])


  return (
    <NavigationContainer>
    <PaperProvider>
      <Tab.Navigator
        tabBarOptions={{
          style: {backgroundColor: "#ffffff"},
          activeTintColor: '#4ade80',
          labelStyle: {
            fontSize: 11
          }
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <AntDesign name="home" size={25} style={{color: focused? "#4ade80" : "black"}}/>
            ),
          }}/>

        
        <Tab.Screen 
          name="Statistics" 
          component={Statistics}
          options={{
            tabBarIcon: ({focused}) => (
              <AntDesign name="barschart" size={25} style={{color: focused? "#4ade80" : "black"}}/>
            ),
          }}/>


        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({focused}) => (
              <AntDesign name="setting" size={25} style={{color: focused? "#4ade80" : "black"}}/>
            )
          }}/>
      </Tab.Navigator>
    </PaperProvider>
    </NavigationContainer>
   
  );
}

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 2 },
//   });
// }

async function registerForPushNotificationsAsync() {
  let token;
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}