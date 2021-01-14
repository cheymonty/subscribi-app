import React, {createRef} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Title, Paragraph, Subheading} from 'react-native-paper';
import {dateToString} from '../utils/helpers'
import {SubCardActions} from './SubCardActions'

//TODO:
// [] implement press to edit


//has to be a function for correct createRef use
export default function SubCard({id, name, cost, endDay}) {
    const actionSheetRef = createRef()

    return (
        <View>
            <TouchableOpacity 
                style={styles.container}
                onLongPress={() => actionSheetRef.current?.show()}
                activeOpacity={0.6}    
            >
                <View style={{height: "70%"}}>
                    <Title style={styles.cardTitle}>{name}</Title>
                </View>
                
                <View style={{flexDirection: "row"}}>
                    <Subheading style={styles.cost}>{cost === 0 ? "Free" : `$${cost}`}</Subheading>
                    <Subheading style={styles.date}>{dateToString(endDay)}</Subheading>
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


const styles = StyleSheet.create({
    container: {  
        width: "96%",
        height: 102,
        left: "2%",
        top: 5,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 5,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },

    cardTitle: {
        top:15,
        left: 13,
        fontSize: 30,  
        color: "#000000" ,
        paddingTop: 0.5
    },

    cost: {
        left:13,
        color: "#000000",
        width: "50%",  
    },

    date: {
        color: "#000000",
        fontWeight:"bold",
        right : 13,
        width: "50%",
        textAlign: "right",  
    },

    edit: {
        textAlign: "right",
        // backgroundColor: "black"
    },

});



