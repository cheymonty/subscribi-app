import AsyncStorage from '@react-native-async-storage/async-storage';

async function updateAsyncSubs(subs) {
    await AsyncStorage.setItem('@subscriptions', JSON.stringify(subs))
}

async function updateAsyncDarkMode(darkMode) {
    await AsyncStorage.setItem("@darkMode", JSON.stringify(darkMode))
}

export {updateAsyncDarkMode, updateAsyncSubs}