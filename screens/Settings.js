import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {Divider, Switch, List, Menu, Button} from 'react-native-paper'
import {timeToString} from '../utils/helpers'
import Header from '../components/Header'

import Context from '../context/Context'

// state : {
//     allowReminders: Boolean
// }


export default function Settings() {
    const [state, setState] = React.useState({
        allowReminders: true
    })

    const [allowReminders, setReminders] = React.useState(true)


    const [timeMenu, setTimeMenu] = React.useState(false)
    const closeTimeMenu = () => setTimeMenu(false)

    const {darkMode, toggleDarkMode, theme, setNotiTime, timeOfNotification } = useContext(Context)

    const setTime = (hour) => {
        setNotiTime(hour)
        closeTimeMenu()  
    }
    

    return (
        <View style={styles(theme).container}>
            <Header title="Settings"/>
            <List.Subheader>General</List.Subheader>

            <List.Item
                title="Dark Mode"
                left={props => <List.Icon {...props} color={theme.primary} icon="weather-night"/>}
                right={_=> <Switch color={theme.accent} onValueChange={toggleDarkMode} value={darkMode}/>}
            />
         

            <List.Item 
                title="Reminder Notifications"
                left={props => <List.Icon {...props} color={theme.primary} icon="bell-outline"/>}
                right={_=> <Switch color={theme.accent} onValueChange={() => setReminders(!allowReminders)} value={allowReminders}/>}
            />
        

            <List.Subheader>Notifications</List.Subheader>

          
            <List.Item
                title="Notification Time"   
                left={props => <List.Icon {...props} color={theme.primary} icon="clock-outline"/>} 
                right={_ => 
                    <Menu
                        visible={timeMenu}
                        onDismiss={closeTimeMenu}
                        anchor={<Button icon="arrow-down" onPress={() => setTimeMenu(!timeMenu)} contentStyle={{flexDirection: "row-reverse"}}>{timeToString(timeOfNotification)}</Button>}
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


        </View>
    )
}

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:theme.background
    },     
  })
