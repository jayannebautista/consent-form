import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useConsent } from "../ConsentContext";
import { styles } from "../Style";
import Icon from 'react-native-vector-icons/AntDesign';
function NextButton({ onNext = f => f }) {

    const { consent } = useConsent();
    const checkIfDisabled = () => {
        return consent.name.trim() == '' || consent.language.trim() == '';
    }
    return (
        <View style={styles.btnRight}>
            <TouchableOpacity onPress={onNext} style={styles.btnGrey} disabled={checkIfDisabled() ? true : false}>
                <Text style={{ fontSize: 15 }}>Next</Text>
                <Icon name="arrowright" size={10} style={{ marginLeft: 10 }} color="#000" />
            </TouchableOpacity>
        </View>
    )
}
export default NextButton;