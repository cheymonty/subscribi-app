import React from 'react'
import {FlatList} from 'react-native'
import {Headline} from 'react-native-paper'
import SubCard from './SubCard'


export default function SubCardList({subscriptions, textColor}) {
    return (
        <FlatList 
        data={subscriptions}
        renderItem={({item}) => {
            return (
                <SubCard sub={item}/>
            )
        }}
        ListEmptyComponent={_ => {
            return (
                <Headline style={{textAlign: "center", height: "100%", color: textColor, marginTop: "55%"}}>Tap + to add a subscription</Headline>
            )
        }}
        keyExtractor={item => item.key}/>
    )
}