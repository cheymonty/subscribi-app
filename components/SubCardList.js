import React, {useContext} from 'react'
import {FlatList} from 'react-native'
import Context from '../context/Context'
import SubCard from './SubCard'


export default function SubCardList() {
    const context = useContext(Context)
    return (
        <FlatList 
        data={context.subscriptions}
        renderItem={({item}) => {
            return (
                <SubCard 
                    editPress={_ => editSub(item.key)} 
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