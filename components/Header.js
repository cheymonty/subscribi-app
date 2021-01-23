import React, {useContext} from 'react'
import {Appbar} from 'react-native-paper'
import Context from '../context/Context'
import Constants from 'expo-constants'


export default function Header({title}) {
    const {theme} = useContext(Context)

    return (
        <Appbar.Header statusBarHeight={Constants.statusBarHeight} style={{backgroundColor: "transparent", elevation: 0}}>
            <Appbar.Content titleStyle={{fontSize: 30, color: theme.primary}} title={title}/>
        </Appbar.Header>
    )
}