import React, {useState, useContext} from 'react'
import { StyleSheet, View, Modal} from 'react-native'
import { Title, FAB, Appbar, IconButton, Button, Headline} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddSub} from '../components/AddSub'
import * as Notifications from 'expo-notifications'
import SubCardList from '../components/SubCardList'

import Context from '../context/Context'

/*Subscriptions object
{
    key: String,
    name: String,
    cost: Number,
    startDay: Date,
    duration: String
    endDay: Date,
        //TODO: [] Remove endDay, and calculate from startDay + duration
}

*/

// TODO:
//     [] Dark mode makes things white, maybe explicitly give things the black/gray color
let timeOfNotification;
export default function Home() {

    const [modalVisible, setModalVisible] = useState(false);
    

    const showModal = () => setModalVisible(true)



    const [duration, setDuration] = useState("1 days")

    const {subscriptions, sortSubs, theme} = useContext(Context)


    function hideDialog() {
        setModalVisible(false)  
    }

    async function addSub() {
        
        //safeguard for setting end date to be the current date and
        //causing errors with making notifications
        if (endDate.toDateString() !== new Date().toDateString()) { 
            let newDate = endDate
            
            // console.log("noti: " + typeof timeOfNotification)
            // newDate.setHours(timeOfNotification)
            // newDate.setMinutes(0)
            // newDate.setSeconds(0)
           
            // await Notifications.scheduleNotificationAsync({
            //     content: {
            //         title: `${name} is recurring soon!`,
            //         body: `Your ${name} subscription is about to recur`,
            //         data: { data: 'goes here' },
            //         },
            //     trigger: newDate,
            // })

            // console.log('Notification scheduled for: ' + newDate);
            
            //TODO: Just for testing
            Notifications.cancelAllScheduledNotificationsAsync()
        }
    }

    return (
      <View style={styles(theme).container}>
           <Appbar.Header style={{backgroundColor: theme.primary}}>
                <Appbar.Content title="Home" titleStyle={{fontSize: 25, color:theme.headerText}}/>
                <Appbar.Action icon="sort" color={theme.headerText} onPress={sortSubs} accessibilityLabel="Sort subscriptions"/>
                <Appbar.Action icon="plus" color={theme.headerText} onPress={showModal}  accessibilityLabel="Add a new subscription"/>
            </Appbar.Header>
            
            {/* <Title style={styles.header}>Home</Title> */}

        <Modal animationType="slide" visible={modalVisible} onRequestClose={hideDialog} presentationStyle="formSheet">
            <View style={{backgroundColor: "rgb(242,242,242)", height:"100%"}}>

                <View style={{flexDirection: 'row', backgroundColor: "white"}}>
                    <Title style={styles(theme).modalTitle}>New Subscription</Title>
                    {/* <IconButton style={{textAlign: "right"}} icon="close" onPress={hideDialog}/> */}
                    <Button uppercase={false} style={{ marginTop: 15}} color="#ff4c4c" onPress={hideDialog}>Cancel</Button>
                </View>

                <AddSub/>
                <Button style={styles(theme).cancelButton} mode="contained" onPress={hideDialog}>Cancel</Button>
            </View>
        </Modal>

        {subscriptions.length === 0 && 
            <Headline style={{textAlign: "center"}}>Tap + to add a subscription</Headline>
        }

        <SubCardList
            subscriptions={subscriptions}
        />

        <FAB style={styles(theme).fab} icon="plus" onPress={showModal}/>
      </View>
    );
}

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    },

    modalTitle: {
        // textAlign: "center",
        color: theme.primary,
        marginTop: 15,
        marginLeft: "25%",     
    },
 
    fab: {
        position: 'absolute',
        margin: 20, 
        right: 0,
        bottom: 0, 
        backgroundColor: theme.primary
    }, 
    
    header: {
        // marginTop:20,
        // color: "#ff8883", 
        color: theme.primary,
        fontSize: 30, 
        left:13,
        textAlign:"left"
    }, 

    cancelButton: {
        width: "35%", 
        // backgroundColor: "rgba(255,0,0,.7)",
        backgroundColor: "#ff4c4c",
        borderWidth: 2,
        // borderColor: "rgba(255,0,0,.7)",
        borderColor: "#ff4c4c",
        borderRadius: 20,
        marginRight: "15%"
    },
  })
