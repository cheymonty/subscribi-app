import 'react-native-gesture-handler'
import React from 'react'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Add from './pages/Add'
import Statistics from './pages/Statistics'
import { Provider as PaperProvider } from 'react-native-paper'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function App() {
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


