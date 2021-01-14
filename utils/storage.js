import AsyncStorage from '@react-native-async-storage/async-storage';

async function updateAsyncDarkMode(darkMode) {
    await AsyncStorage.setItem("@darkMode", JSON.stringify(darkMode))
}

async function updateStorage(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value))
}

export {updateAsyncDarkMode, updateStorage}