import React, {useState, useContext} from 'react'
import { StyleSheet, TextInput, View, Keyboard} from 'react-native'
import { Button, Paragraph} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import SegmentedPicker from 'react-native-segmented-picker'
import constants from '../utils/constants'
import {dateToString, getEndDate} from '../utils/helpers'
import {createNotification} from '../utils/notifications'

import Context from '../context/Context'


export const AddSub = ({}) => {
    const [name, setName] = useState('')
    const [cost, setCost] = useState(0)
    const [startDate, setStartDate] = useState(new Date())
    const [startDateDialog, setStartDateDialog] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)
    const [duration, setDuration] = useState("1 days")

    const {addSub, theme, timeOfNotification} = useContext(Context)

    function submit() {
        //structuring newSub

        //TODO: if duration button isnt clicked at all, duration ends up being "" and
        //setDuration doesnt fire in time
        // if (duration.length === 0) {
        //     console.log("got here")
        //     setDuration("1 days")
        // }

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
    }

    function startButton() {
        setStartDateDialog(!startDateDialog)
        Keyboard.dismiss()
    }

    function pickerButton() {
        setPickerVisible(true)
        Keyboard.dismiss()
    }

    return (
        <View style={{backgroundColor: "rgb(242,242,242)", margin: "10%"}}>
            <Paragraph style={{fontWeight: "bold"}}>Subscription Name</Paragraph>
            <TextInput 
                    style={styles(theme).nameInput} 
                    maxLength={25}
                    placeholder="Subscription Name" 
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
                    onChangeText={price => setCost(Number(price))}
                    onSubmitEditing={(e) => setCost(Number(e.nativeEvent.text))} 
                    underlineColorAndroid="transparent"
            />

            <Paragraph style={{fontWeight: "bold"}}>Subscription Start</Paragraph>
            <Button color={theme.primary} uppercase={false} onPress={startButton} style={styles(theme).startDate}>Start Date: {dateToString(startDate)}</Button>

            {/* TODO: need to fix android, setStartDate is only fired when okay is pressed. On ios it is called after every spin */}
            {startDateDialog && <DateTimePicker mode="date" display="spinner" value={startDate} onChange={(e, d) => setStartDate(d)}/>}


            <Paragraph style={{fontWeight: "bold"}}>Duration</Paragraph>
            <Button uppercase={false} icon="arrow-down" contentStyle={{flexDirection: "row-reverse"}} color="black" onPress={pickerButton}>Select duration: {duration}</Button>
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

         
            <Button style={styles(theme).doneButton} disabled={name.length > 0 ? false : true} mode="contained" onPress={submit}>Done</Button>

        </View>
    )
}

const styles = (theme) => StyleSheet.create({
    nameInput: {
        // fontSize: 20,
        // left: 20,
        // marginTop: 15,
        backgroundColor: "white",
        textAlign: "center",
        height: 50,
        fontSize: 15,
        borderWidth: 2,
        borderColor: theme.accent,
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
        backgroundColor: theme.accent,
        // marginLeft: "25%",
        borderWidth: 2,
        borderColor: theme.accent,
        borderRadius: 10,      
    },
  })