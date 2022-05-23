import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key) => {
    try {

        const value = await AsyncStorage.getItem(`@${key}`);

        if (value !== null && typeof value !== 'undefined') {
            const result = await JSON.parse(value);
            return result
        }
        else {
            return []
        }
    } catch (error) {
        throw error;

    }
}
export const setItem = async (key, value) => {
    try {
        let newValue = [];
        if (typeof value === 'undefined' || value === null) {
            newValue = await JSON.stringify([])
        }
        else {

            newValue = await JSON.stringify(defaultValue)
        }
        await AsyncStorage.setItem(`@${key}`, newValue);

        return { success: 1, message: 'successfully added consent' };
    } catch (e) {
        throw e
        // saving error
    }
}
