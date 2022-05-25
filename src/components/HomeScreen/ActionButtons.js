import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import EIcon from "react-native-vector-icons/EvilIcons";
import 'prop-types';
import { styles } from "../Style";
import PropTypes from 'prop-types';

function ActionButtons({ retry = f => f, answer, onSaveConsent = f => f }) {
    return (
        <View style={styles.btnContainer}>
            <View style={styles.customBtn}>
                <TouchableOpacity onPress={retry}>
                    <View style={styles.customBtnInner}>
                        <Text style={styles.customBtnText}>Retry</Text>
                        <EIcon name="redo" size={30} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.customBtn}>
                <TouchableOpacity disabled={!answer} onPress={onSaveConsent}>
                    <View style={styles.customBtnInner}>
                        <Text style={styles.customBtnText}>Save</Text>
                        <Icon name="arrowright" size={20} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
ActionButtons.propTypes = {
    retry: PropTypes.func.isRequired,
    answer: PropTypes.string,
    onSaveConsent: PropTypes.func.isRequired,

}
ActionButtons.defaultProps = {
    retry: () => { },
    answer: null,
    onSaveConsent: () => { }
}
export default ActionButtons;