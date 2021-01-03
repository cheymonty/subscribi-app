import React, {useState} from 'react'
import { StyleSheet, View, FlatList} from 'react-native'
import {Text, Headline, Appbar} from 'react-native-paper'
import {MiniCard} from '../components/MiniCard'

export default function Statistics() {

    const [state, setState] = useState({
        temp: [
            {key: "1", name: "Playstation"},
            {key: "2", name: "Amazon"},
            {key:"3", name: "Nintendo"},
            {key: "4", name: "Spotify"},
            {key: "5", name: "YouTube Premium"},
            {key: "6", name: "Disney+"},
            {key: "7", name: "Netflix"},
            {key: "8", name: "Birth control"},
            // {key: "9", name: "Xbox"}
        ]
    })


    function showChart(key) {
        
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor: "#4ade80"}}>
                <Appbar.Content titleStyle={{fontSize: 25, color:"white"}} title="Statistics"/>
            </Appbar.Header>


            {/* chart part of the screen */}
            <View style={{height: "45%"}}>
                <Headline style={{textAlign: "center"}}>Tap a subscription for stats</Headline>
            </View>



            {/* loop through asyncstorage subscriptions */}
            <FlatList 
                data={state.temp}
                numColumns={3}
                key={state.temp.length}
                columnWrapperStyle={{alignItems: "flex-start"}}
                renderItem={({item, index}) => {
                return (
                    <MiniCard name={item.name} />
                ) 
                }}
            /> 

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})