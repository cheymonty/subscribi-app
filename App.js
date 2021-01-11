import 'react-native-gesture-handler'
import React, {useState, useEffect, useRef} from 'react'
import {Platform} from 'react-native'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Statistics from './pages/Statistics'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as PaperProvider } from 'react-native-paper'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import constants from './utils/constants'

import Context from './context/Context'

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
    const setup = async() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      })

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response)
      })

    let timeOfNotification = await AsyncStorage.getItem("@timeOfNotification")
    if (!timeOfNotification) {
      try {
        await AsyncStorage.setItem('@timeOfNotification', JSON.stringify(constants.DEFAULT_TIME))
      } catch(e) {
      }
    }


    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    } 
  }
  setup()  
  }, [])


  //for global state
  const [subscriptions, setSubs] = useState([])
  const addSub = (sub) => {
    let s = subscriptions
    s.unshift(sub)
    setSubs(s)
  }

  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const global = {
    subscriptions: subscriptions,
    addSub,
    darkMode: darkMode,
    toggleDarkMode
  }

  return (
    <Context.Provider value={global}>
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
    </Context.Provider>
   
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