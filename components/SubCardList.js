import React from 'react'
import {FlatList} from 'react-native'
import SubCard from './SubCard'


export default function SubCardList({subscriptions}) {
    return (
        <FlatList 
        data={subscriptions}
        renderItem={({item}) => {
            return (
                <SubCard
                    id={item.key}
                    name={item.name} 
                    cost={item.cost}
                    endDay={item.endDay}
                />
            )
        }}
        keyExtractor={item => item.key}/>
    )
}