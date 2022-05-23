import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

import { styles } from "../Style";
import Icon from 'react-native-vector-icons/AntDesign';
function NextButton({ onNext = f => f, title = 'Next', disabled = false }) {
    return (
        <View>
            <TouchableOpacity onPress={onNext} style={styles.btnGrey} disabled={disabled}>
                <Text style={styles.label}>{title}</Text>
                <Icon name="arrowright" size={20} style={{ marginLeft: 10 }} color="#000" />
            </TouchableOpacity>
        </View>
    )
}
export default NextButton;