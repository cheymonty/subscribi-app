import React from 'react'
import { StyleSheet, View} from 'react-native'
import {Appbar, Divider,Switch, List,Menu,Button} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

// state : {
//     displayTime: String
//     timeOfNotification: Number
//     darkMode: Boolean
//     allowReminders: Boolean
// }

export default function Settings() {
    const DEFAULT_TIME_STRING = "12:00 PM"
    const DEFAULT_TIME = 12


    const [state, setState] = React.useState({
        darkMode: false,
        allowReminders: true
    })

    useEffect(() => {
        const check = async() => {
            const displayTime = await AsyncStorage.getItem('@displayTime')
            const timeOfNotification = await AsyncStorage.getItem('@timeOfNotification')
            console.log(displayTime)
            console.log("noti: " + timeOfNotification)

            if (!displayTime) {
                try {
                    await AsyncStorage.setItem('@displayTime', DEFAULT_TIME_STRING)
                    await AsyncStorage.setItem('@timeOfNotification', JSON.stringify(DEFAULT_TIME))
                } catch(e) {
                }
            }

    
            setState({
                displayTime: displayTime? displayTime: DEFAULT_TIME_STRING,
                timeOfNotification: timeOfNotification? JSON.parse(timeOfNotification): DEFAULT_TIME
            })
  
        }
        check()
    }, [])

    const [allowReminders, setReminders] = React.useState(true)

    const [darkMode, setDarkMode] = React.useState(false)

    const [checked, setChecked] = React.useState(true)

    const [timeMenu, setTimeMenu] = React.useState(false)
    const closeTimeMenu = () => setTimeMenu(false)

    const setTime = async(hour) => {
        let displayTime;

        if (hour < 12)
            displayTime = `${hour}:00 AM` //am
        else if (hour > 12)
            displayTime = `${hour-12}:00 PM` //pm
        else
            displayTime = `${hour}:00 PM` //noon
        
        setState({
            displayTime: displayTime,
            timeOfNotification: hour
        })

        try {
            await AsyncStorage.setItem('@displayTime', displayTime)
            await AsyncStorage.setItem('@timeOfNotification', JSON.stringify(hour))
        } catch(e) {

        }
   
        closeTimeMenu()  
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor: "#4ade80"}}>
                <Appbar.Content titleStyle={{fontSize: 25, color:"white"}} title="Settings"/>
            </Appbar.Header>

            <List.Subheader>General</List.Subheader>

            <List.Item
                title="Dark Mode"
                left={props => <List.Icon {...props} color="#4ade80" icon="weather-night"/>}
                right={_=> <Switch color="#42EBDF" onValueChange={() => setDarkMode(!darkMode)} value={darkMode}/>}
            />
         

            <List.Item 
                title="Reminder Notifications"
                left={props => <List.Icon {...props} color="#4ade80" icon="bell-outline"/>}
                right={_=> <Switch color="#42EBDF" onValueChange={() => setReminders(!allowReminders)} value={allowReminders}/>}
            />
        

            <List.Subheader>Notifications</List.Subheader>

          
            <List.Item
                title="Notification Time"   
                left={props => <List.Icon {...props} color="#4ade80" icon="clock-outline"/>} 
                right={_ => 
                    <Menu
                    visible={timeMenu}
                    onDismiss={closeTimeMenu}
                    anchor={<Button onPress={() => setTimeMenu(!timeMenu)}>{state.displayTime}</Button>}
                    >
                        <Menu.Item onPress={() => {setTime(6)}} title="6:00 AM"/>
                        <Menu.Item onPress={() => {setTime(9)}} title="9:00 AM"/>
                        <Divider />
                        <Menu.Item onPress={() => {setTime(12)}} title="12:00 PM"/>
                        <Menu.Item onPress={() => {setTime(15)}} title="3:00 PM"/>
                        <Menu.Item onPress={() => {setTime(18)}} title="6:00 PM"/>
                    </Menu>}
            />
    

            <List.Item
                title="1 day before"
                right={_=> <Switch color="#42EBDF" onValueChange={() => setChecked(!checked)} value={checked}/>}
            />
      

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:"#f0fff1"
    }, 

    listContainer: {
        backgroundColor: "white", 
        borderRadius: 20, 
        marginLeft: "5%", 
        marginRight: "5%", 
        marginBottom: "5%"
    }
    
  });
