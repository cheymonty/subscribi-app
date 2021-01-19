import React from 'react'
import {FlatList} from 'react-native'
import SubCard from './SubCard'


export default function SubCardList({subscriptions}) {
    return (
        <FlatList 
        data={subscriptions}
        renderItem={({item}) => {
            return (
                <SubCard sub={item}/>
            )
        }}
        keyExtractor={item => item.key}/>
    )
}