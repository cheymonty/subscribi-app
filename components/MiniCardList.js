import React from 'react'
import {FlatList} from 'react-native'
import {MiniCard} from './MiniCard'


export default function MiniCardList({subscriptions}) {
    return (
        <FlatList 
            data={subscriptions}
            numColumns={3}
            key={subscriptions.length}
            columnWrapperStyle={{alignItems: "flex-start"}}
            renderItem={({item, index}) => {
                return (
                    <MiniCard name={item.name} />
                ) 
            }}
        /> 
    )
}