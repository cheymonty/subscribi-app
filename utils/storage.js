import AsyncStorage from '@react-native-async-storage/async-storage'

async function updateStorage(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value))
}

async function getStorage(key, dfault) {
    let v = await AsyncStorage.getItem(key)
    if (JSON.parse(v))
        return JSON.parse(v)
    return dfault
}

export {updateStorage, getStorage}