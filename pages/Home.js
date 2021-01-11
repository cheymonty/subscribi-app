import React, {useState, useEffect} from 'react'
import { StyleSheet, ScrollView, TextInput, View, FlatList, Modal, LayoutAnimation, UIManager, Platform} from 'react-native'
import { Title, Text, FAB, Appbar, IconButton, Button, Headline, Portal, Dialog, Paragraph} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SegmentedPicker from 'react-native-segmented-picker'
import {Icon, dateToString} from '../utils/helpers'
import constants from '../utils/constants'
import {AddSub} from '../components/AddSub'
import SubCard from '../components/SubCard'
import * as Notifications from 'expo-notifications'

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
//     [] Put subscriptions in AsyncStorage
let timeOfNotification;
export default function Home() {
    

    //async has access to anything no matter where it was added
    useEffect(() => {
        const check = async() => {
            //TODO: Needs to be cleaned up
            timeOfNotification = await AsyncStorage.getItem('@timeOfNotification')
            
            timeOfNotification = JSON.parse(timeOfNotification)
            
        }
        check()
    }, [])

    //for LayoutAnimation
    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental)
        UIManager.setLayoutAnimationEnabledExperimental(true)

    const [state, setState] = useState({
        subscriptions: []
    })
    const [modalVisible, setModalVisible] = useState(false);
    

    const showModal = () => setModalVisible(true)


    const [name, setName] = useState('')
    const [cost, setCost] = useState(0)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())


    const [startDateDialog, setSDVisible] = useState(false)
    const [endDateDialog, setEDVisible] = useState(false)

    const [pickerVisible, setPickerVisible] = useState(false)
    const [duration, setDuration] = useState("1 days")


    function hideDialog() {
        setModalVisible(false)
        setSDVisible(false)
        setEDVisible(false)
        setStartDate(new Date())
        setEndDate(new Date())
        setCost(0)
        setName('')
        setDuration("")
    }


    function showSD() {
        setSDVisible(true)
    }

    function showED() {
        setSDVisible(false)
        setEDVisible(true)
    }


    async function addSub() {
        hideDialog()
        setEDVisible(false)

        if (endDate === undefined || startDate === undefined)
            return
     
        let key = `${state.subscriptions.length}-${name}`

        //TODO: if duration button isnt clicked at all, duration ends up being "" and
        //setDuration doesnt fire in time
        if (duration.length === 0) {
            console.log("got here")
            setDuration("1 days")
        }

        let newSub = {
            key: key, 
            name: name, 
            cost: cost, 
            startDay: startDate, 
            duration: duration,
            endDay: endDate
        }

        let s = state.subscriptions
        s.unshift(newSub)
        setState({
            subscriptions: s
        })
        
        //safeguard for setting end date to be the current date and
        //causing errors with making notifications
        if (endDate.toDateString() !== new Date().toDateString()) { 
            let newDate = endDate
            
            // console.log("noti: " + typeof timeOfNotification)
            newDate.setHours(timeOfNotification)
            newDate.setMinutes(0)
            newDate.setSeconds(0)
           
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `${name} is recurring soon!`,
                    body: `Your ${name} subscription is about to recur`,
                    data: { data: 'goes here' },
                    },
                trigger: newDate,
            })

            console.log('Notification scheduled for: ' + newDate);
            
            //TODO: Just for testing
            Notifications.cancelAllScheduledNotificationsAsync()
        }

        setStartDate(new Date())
        setEndDate(new Date())
        setDuration("")
        console.log(newSub)
    }


    function editSub(key) {
        let s = state.subscriptions
        if (s) {
            let sub = s.findIndex(sub => sub.key === key)
            if (sub) {
                console.log(sub.name) 
            }
        }
    }

    function sortSubs() {
        let s = state.subscriptions

        if (s.length > 1) { //so there's no unneeded calculations done
            s = s.sort((a, b) => a.endDay - b.endDay)
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            setState({
                subscriptions: s
            })
        }
    }

    function deleteSub(key) {
        let s = state.subscriptions
        let prev = s.findIndex(sub => sub.key === key)
        s.splice(prev, 1)

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setState({
            subscriptions: s
        }) 
    }

    return (
      <View style={styles.container}>
           <Appbar.Header style={{backgroundColor: "#4ade80"}}>
                <Appbar.Content title="Home" titleStyle={{fontSize: 25, color:"white"}}/>
                <Appbar.Action icon="sort" color="white" onPress={sortSubs} accessibilityLabel="Sort subscriptions"/>
                <Appbar.Action icon="plus" color="white" onPress={showModal}  accessibilityLabel="Add a new subscription"/>
            </Appbar.Header>
            
            {/* <Title style={styles.header}>Home</Title> */}
            
        {/* {modalVisible && <AddSub visible={modalVisible}/>} */}
        {/* {modalVisible? <AddSub visible={modalVisible}/>: null} */}

        <Modal animationType="slide" visible={modalVisible} onRequestClose={hideDialog} presentationStyle="formSheet">
            <View style={{backgroundColor: "rgb(242,242,242)", height:"100%"}}>

                <View style={{flexDirection: 'row'}}>
                    <Title style={styles.modalTitle}>New Subscription</Title>
                    <IconButton style={{textAlign: "right"}} icon="close" onPress={hideDialog}/>
                </View>

                {/* <AddSub/>
                <Button style={styles.cancelButton} mode="contained" onPress={hideDialog}>Cancel</Button> */}
                
                <Paragraph style={{fontWeight: "bold", marginLeft: "10%"}}>Subscription Name</Paragraph>
                <TextInput 
                    style={styles.nameInput} 
                    maxLength={30}
                    placeholder="Subscription Name" 
                    onChangeText={name => setName(name)}
                    onSubmitEditing={(e) => setName(e.nativeEvent.text)} 
                    underlineColorAndroid="transparent"
                />

               
                <Paragraph style={{fontWeight: "bold", marginLeft: "10%"}}>Price ($)</Paragraph>
                <TextInput 
                    style={styles.costInput} 
                    keyboardType="numeric"
                    maxLength={6}
                    placeholder="Price" 
                    onChangeText={price => setCost(Number(price))}
                    onSubmitEditing={(e) => setCost(Number(e.nativeEvent.text))} 
                    underlineColorAndroid="transparent"
                />
               
               
                <Paragraph style={{fontWeight: "bold"}}>Subscription Start</Paragraph>
                <Button mode="outlined" uppercase={false} onPress={showSD} style={styles.startDate}>Start Date: {dateToString(startDate)}</Button>
                
                {startDateDialog && <DateTimePicker mode="date" value={startDate} onChange={(_, d) => setStartDate(d)}/>}

                <Headline>Subscription End</Headline>
                <Button mode="outlined" uppercase={false} onPress={showED} style={styles.endDate}>End Date: {dateToString(endDate)}</Button>

                {endDateDialog && <DateTimePicker minimumDate={endDate} mode="date" value={endDate} onChange={(_, d) => setEndDate(d)}/>}


                <Button uppercase={false} icon="arrow-down" contentStyle={{flexDirection: "row-reverse"}} color="black" onPress={() => setPickerVisible(true)}>Select duration: {duration}</Button>
                <SegmentedPicker
                    visible={pickerVisible}
                    onConfirm={selections => {
                        setDuration(`${selections.col_1} ${selections.col_2}`)
                        setPickerVisible(false)
                    }}
                    onCancel={selections => {
                        setDuration(`${selections.col_1} ${selections.col_2}`)
                        setPickerVisible(false)
                    }}
                    confirmText="Done"
                    options={constants.PICKER_OPTIONS}    
                />

                <View style={{flexDirection: 'row', justifyContent: "center"}}>
                    <Button style={styles.cancelButton} mode="contained" onPress={hideDialog}>Cancel</Button>
                    
                </View>
                <Button style={styles.doneButton} disabled={name.length > 0 ? false : true} mode="contained" onPress={addSub}>Done</Button>
            </View>
        </Modal>


        {/* <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Add Subscription</Dialog.Title>
            <Dialog.Content>
                <TextInput label="Subscription Name" onChangeText={txt => setName(txt)}/>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button onPress={showSD}>Next</Button>
            </Dialog.Actions>
            </Dialog>
        </Portal>

        {startDateDialog && (<Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Enter Start Date</Dialog.Title>
            <Dialog.Content>
                <DateTimePicker mode="date" display="default" value={startDate} onChange={(_, d) => setStartDate(d)}/>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button onPress={showED}>Next</Button>
            </Dialog.Actions>
            </Dialog>
        </Portal>)}

        {endDateDialog && (<Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Enter End Date</Dialog.Title>
            <Dialog.Content>
                <DateTimePicker mode="date" display="default" value={endDate} onChange={(_, d) => setEndDate(d)}/>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button onPress={addSub}>Done</Button>
            </Dialog.Actions>
            </Dialog>
        </Portal>)} */}

        {state.subscriptions.length === 0 && 
            <Headline style={{textAlign: "center"}}>Tap + to add a subscription</Headline>
        }

        <FlatList 
        data={state.subscriptions}
        renderItem={({item}) => {
            return (
                <SubCard 
                    editPress={_ => editSub(item.key)} 
                    deletePress={_ => deleteSub(item.key)} 
                    name={item.name} 
                    cost={item.cost}
                    endDay={item.endDay}
                />
            )
        }}
        keyExtractor={item => item.key}/>

        <FAB style={styles.fab} icon="plus" onPress={showModal}/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#f0f8ff",
        // backgroundColor: "rgb(252, 130, 91)",
        // backgroundColor:"#f0fff1"
    },

    modalTitle: {
        // textAlign: "center",
        color: "#4ade80",
        marginTop: 15,
        marginLeft: "25%",     
    },
 
    nameInput: {
        // fontSize: 20,
        // left: 20,
        // marginTop: 15,
        backgroundColor: "white",
        textAlign: "center",
        height: 50,
        fontSize: 15,
        borderWidth: 2,
        borderColor: "#42EBDF",
        borderRadius: 10,
        width: "80%",
        marginLeft: "10%",
        marginBottom: "8%"
        
    },

    costInput: {
        backgroundColor: "white",
        textAlign: "center",
        height: 50,
        fontSize: 15,
        borderWidth: 2,
        borderColor: "#ccd5ff",
        borderRadius: 10,
        width: "20%",
        marginLeft: "10%",
        marginBottom: "8%"
    },
    
    startDate: {
        width: "70%", 
        marginLeft: "15%"
       
    }, 

    endDate: {
        width: "70%", 
        marginLeft: "15%"
    },

    fab: {
        position: 'absolute',
        margin: 20, 
        right: 0,
        bottom: 0, 
        backgroundColor: "#4ade80"
    }, 
    
    header: {
        // marginTop:20,
        // color: "#ff8883", 
        color: "#4ade80",
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

    doneButton: {
        width: "80%", 
        marginLeft: "10%",
        backgroundColor: "#4ade80",
        // marginLeft: "25%",
        borderWidth: 2,
        borderColor: "#4ade80",
        borderRadius: 10,      
    },
  });

