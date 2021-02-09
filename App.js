import 'react-native-gesture-handler'
import React, {useState, useEffect, useRef} from 'react'
import {Platform, LayoutAnimation, UIManager} from 'react-native'
import Home from './screens/Home'
import Settings from './screens/Settings'
import Spending from './screens/Spending'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as PaperProvider } from 'react-native-paper'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import constants from './utils/constants'
import {lightTheme, darkTheme} from './utils/theme'
import {updateStorage} from './utils/storage'
import {reviveDate} from './utils/helpers'
import {changeNotifications} from './utils/notifications'

import Context from './context/Context'
import { sub } from 'react-native-reanimated'

const BottomTab = createBottomTabNavigator()

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

  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental)
    UIManager.setLayoutAnimationEnabledExperimental(true)


  //for global state
  const [subscriptions, setSubs] = useState(async () => {
    let subs = await AsyncStorage.getItem("@subscriptions")
    subs ? setSubs(JSON.parse(subs, reviveDate)) : setSubs([])
    // await AsyncStorage.removeItem('@subscriptions')
    // return []
  })
  const addSub = (sub) => {
    let s = [...subscriptions]

    if (sub !== null)
      s.unshift(sub)
      
    updateStorage("@subscriptions", s)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setSubs(s) 
  }

  const deleteSub = (key) => {
    let s = [...subscriptions]
    let prev = s.findIndex(sub => sub.key === key)
    s.splice(prev, 1)
    updateStorage("@subscriptions", s)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setSubs(s)
  }

  const sortSubs = () => {
    if (subscriptions.length > 1) {
      let s = [...subscriptions]
      s.sort((a, b) => a.endDay - b.endDay)
      updateStorage("@subscriptions", s)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setSubs(s)
    }
  }

  const [darkMode, setDarkMode] = useState(async () => {
    let d = await AsyncStorage.getItem("@darkMode")
    JSON.parse(d) ? setDarkMode(true) : setDarkMode(false)
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    updateStorage("@darkMode", !darkMode)
    toggleTheme(!darkMode)
  }

  const [theme, setTheme] = useState(async () => {
    let d = await AsyncStorage.getItem("@darkMode")
    JSON.parse(d) ? setTheme(darkTheme) : setTheme(lightTheme)
  })

  const toggleTheme = (d) => {
    if (d)
      setTheme(darkTheme)
    else
      setTheme(lightTheme)
  }

  const [timeOfNotification, setTime] = useState(async () => {
    let time = await AsyncStorage.getItem("@timeOfNotification")
    time ? setTime(JSON.parse(time)) : setTime(constants.DEFAULT_TIME)
  })

  const setNotiTime = (hour) => {
    setTime(hour)
    updateStorage("@timeOfNotification", hour)
    changeNotifications(subscriptions, hour)
  }



  const global = {
    subscriptions: subscriptions,
    addSub,
    deleteSub,
    sortSubs,
    darkMode: darkMode,
    toggleDarkMode,
    theme: theme,
    timeOfNotification: timeOfNotification,
    setNotiTime
  }
  

  return (
    <Context.Provider value={global}>
    <NavigationContainer>
    <PaperProvider>
      <BottomTab.Navigator
        tabBarOptions={{
          style: {backgroundColor: theme.background, borderTopWidth: 0, elevation: 0},
          activeTintColor: theme.primary,
          showLabel: false,
        }}
      >
        <BottomTab.Screen 
          name="Home" 
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <AntDesign name="home" size={25} style={{color: focused? theme.primary : theme.inactiveTab}}/>
            ),
          }}/>

        
        <BottomTab.Screen 
          name="Spending" 
          component={Spending}
          options={{
            tabBarIcon: ({focused}) => (
              <AntDesign name="linechart" size={25} style={{color: focused? theme.primary : theme.inactiveTab}}/>
            ),
          }}/>


        <BottomTab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({focused}) => (
              <AntDesign name="setting" size={25} style={{color: focused? theme.primary : theme.inactiveTab}}/>
            )
          }}/>
      </BottomTab.Navigator>
    </PaperProvider>
    </NavigationContainer>
    </Context.Provider>
   
  );
}

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