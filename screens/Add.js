import React from 'react'
import {SafeAreaView, StyleSheet, Modal} from 'react-native'
import {Text} from 'react-native-paper'



export default function Add() {
    return (
        <SafeAreaView style={styles.container}>
        {/* <Modal 
        animationType="slide" 
        visible
        onRequestClose={() => {
            Alert.alert('Modal has now been closed.');
          }} 
        presentationStyle="formSheet">
            <Text>Hello world</Text>
        </Modal> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: "rgb(252, 130, 91)",
    
    }, 

  });