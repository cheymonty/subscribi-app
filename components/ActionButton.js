import React from 'react'
import {StyleSheet} from 'react-native'
import {Button} from 'react-native-paper'


export default function ActionButton({bgColor, disabled=false, mode, onPress, children}) {
    return (
        <Button
            style={styles(bgColor).button}
            disabled={disabled}
            mode={mode}
            labelStyle={{fontSize: 15}}
            contentStyle={{height: 40}}
            onPress={onPress}
        >
            {children}
        </Button>
    )
}

const styles = (bgColor) => StyleSheet.create({
    button: {
        width: "70%",
        margin: 22,
        borderWidth: 2, 
        borderRadius: 20,
        marginLeft: "15%",
        backgroundColor: bgColor,
        borderColor: bgColor,
    }
})