import React, {useState} from 'react'
import { StyleSheet, TextInput, View, LayoutAnimation} from 'react-native'
import { Title, Text, IconButton, Button, Headline, Paragraph} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SegmentedPicker from 'react-native-segmented-picker'
import constants from '../utils/constants'
import {dateToString} from '../utils/helpers'



export const AddSub = ({}) => {
    const [name, setName] = useState('')
    const [cost, setCost] = useState(0)
    const [startDate, setStartDate] = useState(new Date())
    const [startDateDialog, setStartDateDialog] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)
    const [duration, setDuration] = useState("1 days")

    function addSub() {
        console.log(name)
    }

    return (
        <View style={{backgroundColor: "rgb(242,242,242)"}}>
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
            <Button mode="outlined" uppercase={false} onPress={_ => setStartDateDialog(true)} style={styles.startDate}>Start Date: {dateToString(startDate)}</Button>

            {startDateDialog && <DateTimePicker mode="date" value={startDate} onChange={(_, d) => setStartDate(d)}/>}


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

         
            <Button style={styles.doneButton} disabled={name.length > 0 ? false : true} mode="contained" onPress={addSub}>Done</Button>

        </View>
    )
}

const styles = StyleSheet.create({
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
  })