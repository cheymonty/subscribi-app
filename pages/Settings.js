import React from 'react'
import { StyleSheet, View} from 'react-native'
import {Appbar, Divider,Switch, List,Menu,Button} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import {timeToString} from '../components/Common'
import constants from '../components/Constants'

// state : {
//     timeOfNotification: Number
//     darkMode: Boolean
//     allowReminders: Boolean
// }

//TODO: [X] remove displayTime and create a function that changes Number to displayTime

export default function Settings() {
    const [state, setState] = React.useState({
        darkMode: false,
        allowReminders: true
    })

    useEffect(() => {
        const check = async() => {
            const timeOfNotification = await AsyncStorage.getItem('@timeOfNotification')
            console.log("noti: " + timeOfNotification)

            await AsyncStorage.removeItem('@displayTime')

            if (!timeOfNotification) {
                try {
                    await AsyncStorage.setItem('@timeOfNotification', JSON.stringify(constants.DEFAULT_TIME))
                } catch(e) {
                }
            }

    
            setState({
                timeOfNotification: timeOfNotification? JSON.parse(timeOfNotification): constants.DEFAULT_TIME
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
    
        setState({
            timeOfNotification: hour
        })

        try { 
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
                        anchor={<Button icon="arrow-down" onPress={() => setTimeMenu(!timeMenu)} contentStyle={{flexDirection: "row-reverse"}}>{timeToString(state.timeOfNotification)}</Button>}
                    >
                        <Menu.Item onPress={() => {setTime(6)}} title="6:00 AM"/>
                        <Menu.Item onPress={() => {setTime(9)}} title="9:00 AM"/>
                        <Divider />
                        <Menu.Item onPress={() => {setTime(12)}} title="12:00 PM"/>
                        <Menu.Item onPress={() => {setTime(15)}} title="3:00 PM"/>
                        <Menu.Item onPress={() => {setTime(18)}} title="6:00 PM"/>
                    </Menu>        
                }
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
