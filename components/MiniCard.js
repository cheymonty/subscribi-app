import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Title, Text, Paragraph, Subheading} from 'react-native-paper';


const MiniCard = ({name}) => (
    <TouchableOpacity style={styles.container}>
        <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {  
        width: "30%",
        height: 100,
        marginLeft: "2%",
        top: 5,
        marginRight: "1%",
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

    title: {
        top:"38%",
        left: 1,
        textAlign: "center",
        fontSize: 20,  
        color: "#000000" ,
        
    },
});

export {MiniCard}


