import AsyncStorage from '@react-native-async-storage/async-storage';

async function updateAsyncStorage(subs) {
    await AsyncStorage.setItem('@subscriptions', JSON.stringify(subs))
}



export {updateAsyncStorage}