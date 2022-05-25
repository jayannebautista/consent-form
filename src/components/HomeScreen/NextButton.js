import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from "prop-types";
import { styles } from "../Style";

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
NextButton.propTypes = {

    onNext: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired


}
NextButton.defaultProps = {
    onNext: () => { },
    title: 'Next',
    disabled: false
}
export default NextButton;