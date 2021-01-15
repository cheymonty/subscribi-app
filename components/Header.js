import React, {useContext} from 'react'
import {Appbar} from 'react-native-paper'
import Context from '../context/Context'


export default function Header({title}) {
    const {theme} = useContext(Context)

    return (
        <Appbar.Header style={{backgroundColor: "transparent", elevation: 0}}>
            <Appbar.Content titleStyle={{fontSize: 30, color: theme.primary}} title={title}/>
        </Appbar.Header>
    )
}