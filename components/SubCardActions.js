import React from 'react'
import ActionSheet from 'react-native-actions-sheet'
import {StyleSheet} from 'react-native';
import {Title, List, Button} from 'react-native-paper'


//has to be a const to use forwarded ref correctly
export const SubCardActions = React.forwardRef(({name, deletePress}, ref) => {
    return (
        <ActionSheet ref={ref} bounceOnOpen>
             
            <Title style={styles.sheetTitle}>{name}</Title>

            <List.Item
                title="Delete subscription"
                titleStyle={{color: "#ff4c4c", fontSize: 20}}
                left={props => <List.Icon {...props} color="#ff4c4c" icon="delete-outline"/>} 
                onPress={deletePress}   
            />

            
            <List.Item
                title="Edit subscription"
                titleStyle={{fontSize: 20}}
                left={props => <List.Icon {...props} color="#4ade80" icon="pencil-outline"/>}
            />
                
            <Button style={styles.cancelButton} labelStyle={{color: "black", fontWeight: "bold"}} mode="contained" onPress={_ => ref.current?.hide()}>Cancel</Button>     
            
        </ActionSheet>
    )
})



const styles = StyleSheet.create({
  
    sheetTitle: {
        textAlign: "center", 
        fontSize: 30, 
        marginTop: "2%"
    },

    cancelButton: {
        width: "70%", 
        margin: 22,
        backgroundColor: "#DCDCDC",
        borderWidth: 2,
        borderColor: "#DCDCDC",
        borderRadius: 20,
        marginLeft: "15%",
        
    },

})
