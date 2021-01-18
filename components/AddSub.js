import React, {useState, useContext} from 'react'
import { StyleSheet, TextInput, View, Keyboard, Modal, Platform} from 'react-native'
import { Button, Paragraph, Title} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import SegmentedPicker from 'react-native-segmented-picker'
import constants from '../utils/constants'
import {dateToString, getEndDate} from '../utils/helpers'
import {createNotification} from '../utils/notifications'
import {StatusBar} from 'expo-status-bar'

import Context from '../context/Context'


export const AddSub = ({closeModal}) => {
    const [name, setName] = useState('')
    const [cost, setCost] = useState(0)
    const [startDate, setStartDate] = useState(new Date())
    const [startDatePicker, setStartDatePicker] = useState(false)
    const [durationPicker, setDurationPicker] = useState(false)
    const [duration, setDuration] = useState("1 days")

    const {addSub, theme, timeOfNotification} = useContext(Context)

    //structure newSub
    function submit() {
        let endDate = getEndDate(startDate, duration)
        let key = `${Math.floor(Math.random() * 1000)}-${name}`

        let newSub = {
            name: name,
            key: key,
            cost: cost,
            startDay: startDate, 
            endDay: endDate,
            duration: duration,
        }

        //makes sure endDate is in the future for notification purposes
        if (endDate > new Date())
            createNotification(name, endDate, timeOfNotification)
        
        addSub(newSub)
        closeModal()
    }

    function startButton() {
        setStartDatePicker(!startDatePicker)
        Keyboard.dismiss()
    }

    function pickerButton() {
        setDurationPicker(true)
        Keyboard.dismiss()
    }

    function saveStartDate(date) {
        let picked = date || startDate
        setStartDatePicker(Platform.OS === 'ios')
        setStartDate(picked)
    }

    return (
        <Modal animationType="slide" onRequestClose={closeModal} presentationStyle="formSheet">

            <View style={{flexDirection: 'row', backgroundColor: "white"}}>
                <Button uppercase={false} style={{ marginTop: 15, width: "25%"}} color="white" labelStyle={{color: "#ff4c4c"}} onPress={closeModal}>Cancel</Button>  
                <Title style={styles(theme).modalTitle}>New Subscription</Title>
            </View>

            <View style={{backgroundColor: "rgb(242,242,242)", height: "100%"}}>
                <View style={{marginLeft: "5%"}}>
                    <Paragraph style={{fontWeight: "bold"}}>Subscription Name</Paragraph>
                    <TextInput 
                        style={styles(theme).nameInput} 
                        maxLength={20}
                        placeholder="Subscription Name" 
                        onFocus={() => setStartDatePicker(false)}
                        onChangeText={name => setName(name)}
                        onSubmitEditing={(e) => setName(e.nativeEvent.text)} 
                        underlineColorAndroid="transparent"
                    />

                    <Paragraph style={{fontWeight: "bold"}}>Price ($)</Paragraph>
                    <TextInput 
                        style={styles(theme).costInput} 
                        keyboardType="numeric"
                        maxLength={6}
                        placeholder="Price" 
                        onFocus={() => setStartDatePicker(false)}
                        onChangeText={price => setCost(Number(price))}
                        onSubmitEditing={(e) => setCost(Number(e.nativeEvent.text))} 
                        underlineColorAndroid="transparent"
                    />

                    <View style={{flexDirection: "row"}}>
                    <Paragraph style={{fontWeight: "bold"}}>Subscription Start</Paragraph>
                    <Button color={theme.primary} uppercase={false} onPress={startButton} style={styles(theme).startDate}>{dateToString(startDate)}</Button>
                    </View>
        
                    {startDatePicker && 
                        <DateTimePicker mode="date" display="spinner" value={startDate} onChange={(_, d) => saveStartDate(d)} minimumDate={new Date(2000,0,1)}/>
                    }


                    <Paragraph style={{fontWeight: "bold"}}>Duration</Paragraph>
                    <Button uppercase={false} icon="arrow-down" contentStyle={{flexDirection: "row-reverse"}} color="black" onPress={pickerButton}>{duration}</Button>
                    <SegmentedPicker
                        visible={durationPicker}
                        onConfirm={selections => {
                            setDuration(`${selections.col_1} ${selections.col_2}`)
                            setDurationPicker(false)
                        }}
                        onCancel={selections => {
                            setDuration(`${selections.col_1} ${selections.col_2}`)
                            setDurationPicker(false)
                        }}
                        confirmText="Done"
                        options={constants.PICKER_OPTIONS}    
                    />

                
                    <Button style={styles(theme).doneButton} disabled={name.length > 0 ? false : true} mode="contained" onPress={submit}>Done</Button>
                </View>
            </View>
            <StatusBar style={Platform.isPad? "dark" : "light"}/>
        </Modal>
    )
}

const styles = (theme) => StyleSheet.create({
    modalTitle: {
        textAlign: "center",
        color: theme.primary,
        marginTop: 15,   
        width: "50%" 
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
        // borderColor: theme.accent,
        borderColor: theme.primary,
        borderRadius: 10,
        width: "80%",
        // marginLeft: "10%",
        marginBottom: "8%"
        
    },

    costInput: {
        backgroundColor: "white",
        textAlign: "center",
        height: 50,
        fontSize: 15,
        borderWidth: 2,
        // borderColor: "#ccd5ff",
        borderColor: theme.primary,
        borderRadius: 10,
        width: "20%",
        // marginLeft: "10%",
        marginBottom: "8%"
    },
    
    startDate: {
        // width: "95%", 
        // marginLeft: "15%"
       
    }, 

    endDate: {
        width: "70%", 
        // marginLeft: "15%"
    }, 

    doneButton: {
        width: "80%", 
        marginLeft: "10%",
        // backgroundColor: theme.accent,
        backgroundColor: theme.primary,
        // marginLeft: "25%",
        borderWidth: 2,
        // borderColor: theme.accent,
        borderColor: theme.primary,
        borderRadius: 10,
    },
  })