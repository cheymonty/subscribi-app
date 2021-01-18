import React, {useState, useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {FAB, Appbar, Headline} from 'react-native-paper'
import {AddSub} from '../components/AddSub'
import {StatusBar} from 'expo-status-bar'
import SubCardList from '../components/SubCardList'
import Context from '../context/Context'

/*Subscriptions object
{
    key: String,
    name: String,
    cost: Number,
    startDay: Date,
    duration: String
    endDay: Date,
}

*/

export default function Home() {

    const [modalVisible, setModalVisible] = useState(false);
    

    const showModal = () => setModalVisible(true)
    const closeModal = () => setModalVisible(false)

    const {subscriptions, darkMode, sortSubs, theme} = useContext(Context)

    return (
      <View style={styles(theme).container}>
           <Appbar.Header style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.Action icon="sort" color={theme.primary} onPress={sortSubs} accessibilityLabel="Sort subscriptions"/>
                <Appbar.Content title="Home" titleStyle={{fontSize: 30, color: theme.primary}}/>
                <Appbar.Action icon="plus" color={theme.primary} onPress={showModal}  accessibilityLabel="Add a new subscription"/>
            </Appbar.Header>
            
        {modalVisible && <AddSub closeModal={closeModal}/>}

        {subscriptions.length === 0 && 
            <Headline style={{textAlign: "center", color: theme.text, top: "35%"}}>Tap + to add a subscription</Headline>
        }

        <SubCardList
            subscriptions={subscriptions}
        />

        <FAB style={styles(theme).fab} icon="plus" color={theme.background} onPress={showModal}/>
        <StatusBar style={darkMode ? "light" : "dark"}/>
      </View>
    )
}

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    },

    fab: {
        position: 'absolute',
        margin: 20, 
        right: 0,
        bottom: 0, 
        backgroundColor: theme.primary,
        elevation: 5,
        shadowColor: theme.shadow
    }, 
  })

