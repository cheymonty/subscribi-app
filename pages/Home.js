import React, {useState, useEffect} from 'react'
import { StyleSheet, ScrollView, TextInput, View, FlatList, Modal, LayoutAnimation, UIManager, Platform} from 'react-native'
import { Title, Text, FAB, Appbar, IconButton, Button, Headline, Portal, Dialog, Paragraph} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, dateToString} from '../components/Common'
import SubCard from '../components/SubCard'

/*Subscriptions object
{
    key: String,
    name: String,
    costPerMonth: Number,
    startDay: Date,
    endDay: Date,
        //TODO: [X] CHANGE TO DATE AND CONVERT TO STRING IN SUBCARD.JS
}

*/

// TODO:
//     [] Dark mode makes things white, maybe explicitly give things the black/gray color
//     [] Put subscriptions in AsyncStorage

export default function Home() {

    //async has access to anything no matter where it was added
    useEffect(() => {
        const check = async() => {
            const displayTime = await AsyncStorage.getItem('@displayTime')
            const timeOfNotification = await AsyncStorage.getItem('@timeOfNotification')
            console.log(displayTime)
            console.log("noti: " + timeOfNotification)
        }
        check()
    }, [])

    //for LayoutAnimation
    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental)
        UIManager.setLayoutAnimationEnabledExperimental(true)

    const [state, setState] = useState({
        subscriptions: []
    })
    const [visible, setVisible] = useState(false);
    

    const showDialog = () => setVisible(true)


    const [name, setName] = useState('')
    const [costPerMonth, setCostPerMonth] = useState(0)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())


    const [startDateDialog, setSDVisible] = useState(false)
    const [endDateDialog, setEDVisible] = useState(false)


    function hideDialog() {
        setVisible(false)
        setSDVisible(false)
        setEDVisible(false)
        setStartDate(new Date())
        setEndDate(new Date())
        setCostPerMonth(0)
        setName('')
    }

    function showSD() {
        setSDVisible(true)
    }

    function showED() {
        setSDVisible(false)
        setEDVisible(true)
    }


    function addSub() {
        hideDialog()
        setEDVisible(false)

        if (endDate === undefined || startDate === undefined)
            return
            
    
        let key = `${state.subscriptions.length}-${name}`

        let newSub = {
            key: key, 
            name: name, 
            costPerMonth: costPerMonth, 
            startDay: startDate, 
            endDay: endDate
        }

        let s = state.subscriptions
        s.unshift(newSub)
        setState({
            subscriptions: s
        })

        setStartDate(new Date())
        setEndDate(new Date())
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
                <Appbar.Action icon="plus" color="white" onPress={showDialog}  accessibilityLabel="Add a new subscription"/>
            </Appbar.Header>
            
            {/* <Title style={styles.header}>Home</Title> */}
            

        <Modal animationType="slide" visible={visible} onRequestClose={hideDialog} presentationStyle="formSheet">
            <ScrollView style={{backgroundColor: "#f0fff1", height:"100%"}}>

                <View style={{flexDirection: 'row'}}>
                    <IconButton icon="close" onPress={hideDialog}/>
                    <Title style={styles.modalTitle}>New Subscription</Title>
                </View>
                
                <TextInput 
                    style={styles.textInput} 
                    maxLength={30}
                    placeholder="Subscription Name" 
                    onChangeText={name => setName(name)}
                    onSubmitEditing={(e) => setName(e.nativeEvent.text)} 
                    underlineColorAndroid="transparent"
                />


                <TextInput 
                    style={styles.textInput} 
                    keyboardType="numeric"
                    maxLength={6}
                    placeholder="Cost per month" 
                    onChangeText={price => setCostPerMonth(Number(price))}
                    onSubmitEditing={(e) => setCostPerMonth(Number(e.nativeEvent.text))} 
                    underlineColorAndroid="transparent"
                />
                
                {/* <DateTimePicker mode="date"value={startDate} onChange={(_, d) => setStartDate(d)}/>
                <DateTimePicker mode="date"  value={endDate} onChange={(_, d) => setEndDate(d)}/> */}

                <Headline>Subscription Start</Headline>
                <Button mode="outlined" uppercase={false} onPress={showSD} style={styles.startDate}>Start Date: {dateToString(startDate)}</Button>
                
                {startDateDialog && <DateTimePicker mode="date" value={startDate} onChange={(_, d) => setStartDate(d)}/>}
                {/* {startDateDialog? <DateTimePicker mode="date"value={startDate} onChange={(_, d) => setStartDate(d)}/>: null} */}

                <Headline>Subscription End</Headline>
                <Button mode="outlined" uppercase={false} onPress={showED} style={styles.endDate}>End Date: {dateToString(endDate)}</Button>

                {endDateDialog && <DateTimePicker mode="date" value={endDate} onChange={(_, d) => setEndDate(d)}/>}


                <View style={{flexDirection: 'row', justifyContent: "center"}}>
                    <Button style={styles.cancelButton} mode="contained" onPress={hideDialog}>Cancel</Button>
                    <Button style={styles.saveButton} disabled={name.length > 0 ? false : true} mode="contained" onPress={addSub}>Save</Button>
                </View>
            </ScrollView>
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
                    costPerMonth={item.costPerMonth}
                    endDay={item.endDay}
                />
            )
        }}
        keyExtractor={item => item.key}/>

        <FAB style={styles.fab} icon="plus" onPress={showDialog}/>
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
     
    },
 
    textInput: {
        // fontSize: 20,
        // left: 20,
        // marginTop: 15,
        backgroundColor: "#ccd5ff",
        textAlign: "center",
        height: 50,
        fontSize: 15,
        borderWidth: 2,
        borderColor: "#ccd5ff",
        borderRadius: 20,
        width: "80%",
        marginLeft: "10%",
        
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

    saveButton: {
        width: "35%", 
        backgroundColor: "#4ade80",
        // marginLeft: "25%",
        borderWidth: 2,
        borderColor: "#4ade80",
        borderRadius: 20,
    },
  });

