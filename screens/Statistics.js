import React, {useContext} from 'react'
import { StyleSheet, View } from 'react-native'
import {Text, Headline, Appbar} from 'react-native-paper'
import MiniCardList from '../components/MiniCardList'
import Context from '../context/Context'

export default function Statistics() {
    const {subscriptions, theme} = useContext(Context)
  

    function showChart(key) {
        
    }

    return (
        <View style={styles(theme).container}>
            <Appbar.Header style={{backgroundColor: theme.primary}}>
                <Appbar.Content titleStyle={{fontSize: 25, color:"white"}} title="Statistics"/>
            </Appbar.Header>


            {/* chart part of the screen */}
            <View style={{height: "45%"}}>
                {subscriptions.length !== 0 && <Headline style={{textAlign: "center"}}>Tap a subscription for stats</Headline>}
                {subscriptions.length === 0 && <Headline style={{textAlign: "center"}}>Add subcriptions to see your charts</Headline>}
            </View>



            <MiniCardList
                subscriptions={subscriptions}
            />

        </View>
    )
}


const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    }
})