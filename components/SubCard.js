import React, {createRef, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Title, Subheading} from 'react-native-paper';
import {dateToString} from '../utils/helpers'
import {SubCardActions} from './SubCardActions'
import Context from '../context/Context'


//has to be a function for correct createRef use
export default function SubCard({id, name, cost, endDay}) {
    const actionSheetRef = createRef()
    const {theme} = useContext(Context)

    return (
        <View>
            <TouchableOpacity 
                style={styles(theme).container}
                onLongPress={() => actionSheetRef.current?.show()}
                activeOpacity={0.4}    
            >
                <View style={{height: "70%"}}>
                    <Title style={styles(theme).cardTitle}>{name}</Title>
                </View>
                
                <View style={{flexDirection: "row"}}>
                    <Subheading style={styles(theme).cost}>{cost === 0 ? "Free" : `$${cost}`}</Subheading>
                    <Subheading style={styles(theme).date}>{dateToString(endDay)}</Subheading>
                </View>
            </TouchableOpacity>

            <SubCardActions
                ref={actionSheetRef}
                name={name}
                id={id}
            />
        </View>
    )
}


const styles = (theme) => StyleSheet.create({
    container: {  
        width: "96%",
        height: 90,
        left: "2%",
        top: 5,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: theme.accent,
        backgroundColor: "transparent",
        // shadowColor: theme.shadow,
        // shadowOffset: {
	    //     width: 0,
	    //     height: 5,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,
        // elevation: 8,
    },

    cardTitle: {
        top:15,
        left: 13,
        fontSize: 30,  
        // color: theme.accent,
        color: theme.text,
        paddingTop: 0.5
    },

    cost: {
        left:13,
        // color: "#000000",
        color: theme.accent,
        width: "50%",  
    },

    date: {
        color: theme.text,
        fontWeight:"bold",
        right : 13,
        width: "50%",
        textAlign: "right",  
    },
})



