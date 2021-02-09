import React, {useContext, createRef} from 'react'
import ActionSheet from 'react-native-actions-sheet'
import {StyleSheet} from 'react-native'
import {Title, List} from 'react-native-paper'
import Context from '../context/Context'
import {SubModal} from './SubModal'
import ActionButton from './ActionButton'


//has to be a const to use forwarded ref correctly
export const SubCardActions = React.forwardRef(({sub}, ref) => {
    const {deleteSub, theme} = useContext(Context)
    const editRef = createRef()
    return (
        <ActionSheet ref={ref} bounceOnOpen gestureEnabled containerStyle={{backgroundColor: theme.modal}}>
             
            <Title style={styles(theme).sheetTitle}>{sub.name}</Title>

            <List.Item
                title="Delete subscription"
                titleStyle={{color: "#ff4c4c", fontSize: 20}}
                left={props => <List.Icon {...props} color="#ff4c4c" icon="delete-outline"/>} 
                onPress={_ => deleteSub(sub.key)}   
            />

            
            <List.Item
                title="Edit subscription"
                titleStyle={{fontSize: 20, color: theme.text}}
                left={props => <List.Icon {...props} color={theme.primary} icon="pencil-outline"/>}
                onPress={_ => editRef.current?.show()}
            />
                
            <ActionButton bgColor={theme.lightText} mode="contained" onPress={_ => ref.current?.hide()}>Cancel</ActionButton>   

            <SubModal ref={editRef} oldSub={sub}/>  
            
        </ActionSheet>
    )
})



const styles = (theme) => StyleSheet.create({
    sheetTitle: {
        textAlign: "center", 
        fontSize: 30, 
        marginTop: "2%",
        paddingTop: 2,
        color: theme.text
    },
})
