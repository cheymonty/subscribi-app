import React, {createRef} from 'react';
import {StyleSheet, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Title, Paragraph, List, Button, Subheading} from 'react-native-paper';
import {getColor, dateToString} from './Common'
import ActionSheet from 'react-native-actions-sheet'

//TODO:
// [] implement press to edit


//has to be a function for correct createRef use
export default function SubCard({editPress, deletePress, name, costPerMonth, endDay}) {
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
                    <Subheading style={styles.cost}>{costPerMonth === 0 ? "Free" : `$${costPerMonth}/month`}</Subheading>
                    <Subheading style={styles.date}>{dateToString(endDay)}</Subheading>      
                </View>
                {/* <MaterialCommunityIcons style={styles.edit} onPress={editPress} name="pencil" size={24} color="#fd4e6b"/> */}
            </TouchableOpacity>


            <ActionSheet ref={actionSheetRef} bounceOnOpen>
             
                <Title style={styles.sheetTitle}>{name}</Title>

                <List.Item
                    title="Delete subscription"
                    titleStyle={{color: "#ff4c4c", fontSize: 20}}
                    left={props => <List.Icon {...props} color="#ff4c4c" icon="delete-outline"/>} 
                    onPress={deletePress}   
                />

                   
                <List.Item
                    title="Edit subscription"
                    titleStyle={{fontSize: 20}}
                    left={props => <List.Icon {...props} color="#4ade80" icon="pencil-outline"/>}
                />
                       
                <Button style={styles.cancelButton} labelStyle={{color: "black", fontWeight: "bold"}} mode="contained" onPress={_ => actionSheetRef.current?.hide()}>Cancel</Button>     
                    
            </ActionSheet>
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
	        height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },

    sheetTitle: {
        textAlign: "center", 
        fontSize: 30, 
        marginTop: "2%"
    },

    cardTitle: {
        top:20,
        left: 13,
        fontSize: 30,  
        color: "#000000" 
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

    cancelButton: {
        width: "70%", 
        margin: 22,
        backgroundColor: "#DCDCDC",
        borderWidth: 2,
        borderColor: "#DCDCDC",
        borderRadius: 20,
        marginLeft: "15%",
        
    },

});



