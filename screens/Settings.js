import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {Divider, Switch, List, Menu} from 'react-native-paper'
import {timeToString} from '../utils/helpers'
import Header from '../components/Header'
import Context from '../context/Context'
import DropButton from '../components/DropButton'

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
            <List.Subheader style={styles(theme).subHeader}>General</List.Subheader>

            <List.Item
                title="Dark Mode"
                titleStyle={{color: theme.text, fontSize: 18}}
                left={props => <List.Icon {...props} color={theme.primary} icon="weather-night"/>}
                right={_=> <Switch color={theme.accent} onValueChange={toggleDarkMode} value={darkMode}/>}
            />
         

            <List.Item 
                title="Reminder Notifications"
                titleStyle={{color: theme.text, fontSize: 18}}
                left={props => <List.Icon {...props} color={theme.primary} icon="bell-outline"/>}
                right={_=> <Switch color={theme.accent} onValueChange={() => setReminders(!allowReminders)} value={allowReminders}/>}
            />
        

            <List.Subheader style={styles(theme).subHeader}>Notifications</List.Subheader>

          
            <List.Item
                title="Notification Time"   
                titleStyle={{color: theme.text, fontSize: 18}}
                left={props => <List.Icon {...props} color={theme.primary} icon="clock-outline"/>} 
                right={_ => 
                    <Menu
                        visible={timeMenu}
                        onDismiss={closeTimeMenu}
                        contentStyle={{backgroundColor: theme.modal}}
                        anchor={
                            <DropButton
                                uppercase
                                onPress={() => setTimeMenu(!timeMenu)}
                                bgColor={theme.background}
                                textColor={theme.accent}
                            >
                                {timeToString(timeOfNotification)}
                            </DropButton>
                        }
                    >
                        <Menu.Item onPress={() => {setTime(6)}} title="6:00 AM" titleStyle={{color: theme.text}}/>
                        <Menu.Item onPress={() => {setTime(9)}} title="9:00 AM" titleStyle={{color: theme.text}}/>
                        <Divider style={{backgroundColor: theme.lightText}}/>
                        <Menu.Item onPress={() => {setTime(12)}} title="12:00 PM" titleStyle={{color: theme.text}}/>
                        <Menu.Item onPress={() => {setTime(15)}} title="3:00 PM" titleStyle={{color: theme.text}}/>
                        <Menu.Item onPress={() => {setTime(18)}} title="6:00 PM" titleStyle={{color: theme.text}}/>
                    </Menu>        
                }
            />
        </View>
    )
}

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    },     

    subHeader: {
        color: theme.subHeader,
        fontSize: 20
    },
})
