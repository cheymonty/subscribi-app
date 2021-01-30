import React, {useState, useContext} from 'react'
import { StyleSheet, TextInput, Keyboard, Platform} from 'react-native'
import { Button, Title, List} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import SegmentedPicker from 'react-native-segmented-picker'
import constants from '../utils/constants'
import {dateToString, getEndDate} from '../utils/helpers'
import {createNotification} from '../utils/notifications'
import ActionSheet from 'react-native-actions-sheet'
import Context from '../context/Context'
import DropButton from './DropButton'


export const SubModal = React.forwardRef(({oldSub = null}, ref) => {
    const [name, setName] = useState(oldSub? oldSub.name : "")
    const [cost, setCost] = useState(oldSub? oldSub.cost : 0)
    const [startDate, setStartDate] = useState(oldSub? oldSub.startDay : new Date())
    const [startDatePicker, setStartDatePicker] = useState(false)
    const [durationPicker, setDurationPicker] = useState(false)
    const [duration, setDuration] = useState(oldSub? oldSub.duration : "1 days")

    const {subscriptions, addSub, theme, timeOfNotification} = useContext(Context)

    function reset() {
        setName(oldSub? oldSub.name : "")
        setCost(oldSub? oldSub.cost : 0)
        setStartDate(oldSub? oldSub.startDay : new Date())
        setStartDatePicker(false)
        setDurationPicker(false)
        setDuration(oldSub? oldSub.duration : "1 days")
    }

    //structure newSub
    function submit() {
        let endDate = getEndDate(startDate, duration)
        let key = `${Math.floor(Math.random() * 1000)}-${name}`

        if (oldSub) {
            let i = subscriptions.findIndex(sub => sub.key === oldSub.key)
            //after this block is run, "oldSub" doesnt exist anymore
            subscriptions[i].name = name
            subscriptions[i].key = key
            subscriptions[i].cost = cost
            subscriptions[i].startDay = startDate
            subscriptions[i].endDay = endDate
            subscriptions[i].duration = duration

            addSub(null)
            
        } else {
            let newSub = {
                name: name,
                key: key,
                cost: cost,
                startDay: startDate, 
                endDay: endDate,
                duration: duration,
            }

            addSub(newSub)
        }
        
        //TODO: need to delete old notification if editing
        createNotification(name, endDate, timeOfNotification)
        
        reset()
        if (!oldSub)
            ref.current?.hide()
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
        <ActionSheet ref={ref} bounceOnOpen gestureEnabled onClose={reset} openAnimationSpeed={15} containerStyle={{backgroundColor: theme.modal}}>
            <Title style={styles(theme).sheetTitle}>{oldSub? `Edit ${name}` : "New Subscription"}</Title>

            <List.Item
                style={{marginBottom: "3%"}}
                title="Name"
                titleStyle={{color: theme.text, fontSize: 18}}
                right={_=> 
                    <TextInput 
                        style={styles(theme).nameInput} 
                        maxLength={20}
                        placeholder={oldSub? name : "Enter name"} 
                        placeholderTextColor={theme.lightText}
                        onFocus={() => setStartDatePicker(false)}
                        onChangeText={name => setName(name)}
                        onSubmitEditing={(e) => setName(e.nativeEvent.text)} 
                        underlineColorAndroid="transparent"
                    />
                }
            />

             <List.Item
                style={{marginBottom: "3%"}}
                title="Price ($)"
                titleStyle={{color: theme.text, fontSize: 18}}
                right={_=> 
                    <TextInput 
                        style={styles(theme).costInput} 
                        keyboardType="numeric"
                        maxLength={6}
                        placeholder={oldSub? `$${cost.toString()}` : "$"}
                        returnKeyType='done' 
                        placeholderTextColor={theme.lightText}
                        onFocus={() => setStartDatePicker(false)}
                        onChangeText={price => setCost(Number(price))}
                        onSubmitEditing={(e) => setCost(Number(e.nativeEvent.text))} 
                        underlineColorAndroid="transparent"
                    />
                }
            />

            <List.Item
                style={{marginBottom: "3%"}}
                title="Start Date"
                titleStyle={{color: theme.text, fontSize: 18}}
                right={_=> 
                    <Button 
                        color={theme.modal} 
                        uppercase={false} 
                        contentStyle={{marginLeft: -5, top: 2}} 
                        labelStyle={{marginRight: 10, fontSize: 17, color: theme.accent}} 
                        onPress={startButton} 
                    >
                        {dateToString(startDate)}
                    </Button>
                }
            />

            {startDatePicker && 
                <DateTimePicker mode="date" display="spinner" textColor={theme.text} value={startDate} onChange={(_, d) => saveStartDate(d)} minimumDate={new Date(2000,0,1)}/>
            }

            <List.Item
                style={{marginBottom: "3%"}}
                title="Duration"
                titleStyle={{color: theme.text, fontSize: 18}}
                right={_=> 
                    <DropButton
                        uppercase={false}
                        bgColor={theme.modal}
                        textColor={theme.accent}
                        onPress={pickerButton}
                        fontSize={17}
                    >
                        {duration}
                    </DropButton>
                }
            />

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
        </ActionSheet>
       
    )
})

const styles = (theme) => StyleSheet.create({
    sheetTitle: {
        textAlign: "center", 
        fontSize: 30, 
        marginTop: "2%",
        paddingTop: 0.5,
        color: theme.text
    },

    nameInput: {
        width: "75%",
        textAlign: "right",
        paddingHorizontal: 13,
        color: theme.accent,  
        fontSize: 18,
        fontWeight: "500"
    },

    costInput: {
        width: "30%",
        paddingHorizontal: 13,
        textAlign: "right",
        color: theme.accent,
        fontSize: 18,
        fontWeight: "500"
    },

    doneButton: {
        width: "70%", 
        margin: 22,
        backgroundColor: theme.primary,
        borderWidth: 2,
        borderColor: theme.primary,
        borderRadius: 20,
        marginLeft: "15%",     
    },
})