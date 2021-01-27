import React from 'react'
import {Button} from 'react-native-paper'


export default function DropButton({uppercase, onPress, bgColor, textColor, fontSize=16, children}) {
    return (
        <Button
            uppercase={uppercase}
            icon="arrow-down"
            onPress={onPress}
            color={bgColor}
            contentStyle={{flexDirection: "row-reverse", marginLeft: -5, top: 2}} 
            labelStyle={{marginRight: 10, fontSize: fontSize, color: textColor}}
        >
            {children}
        </Button>
    )
}