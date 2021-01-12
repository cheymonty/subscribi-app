import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getSubscriptions() {
    let subs = await AsyncStorage.getItem("@subscriptions")
    console.log(subs)
   
    return subs? JSON.parse(subs) : []
}



export {getSubscriptions}