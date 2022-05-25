import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from "../Style";
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
function Record({
    startRecording = f => f,
    recording,
    record,
    stopRecording = f => f,
    playRecording = f => f,
    answer,
    granted,
    play,
    stopListening = f => f,
    processing,
    state

}) {

    const { t } = useTranslation();
    const renderMic = () => {
        return (
            <TouchableOpacity style={styles.microphone} onPress={startRecording} >
                <Icon name="microphone" size={30} />
            </TouchableOpacity>
        )
    }
    const renderStop = () => {
        return (
            <TouchableOpacity style={styles.microphone} onPress={stopRecording} >
                <Icon name="stop" size={30} />
            </TouchableOpacity>
        )
    }
    const renderPlay = () => {
        return (
            <View style={styles.answerDiv}>
                <TouchableOpacity style={styles.microphone} onPress={playRecording} >
                    <Icon name="play" size={30} />
                </TouchableOpacity>
                {renderAnswer()}
            </View>
        )
    }
    const renderPause = () => {
        return (
            <View style={styles.answerDiv}>
                <TouchableOpacity style={styles.microphone} onPress={stopListening} >
                    <Icon name="pause" size={30} />
                </TouchableOpacity>
                {renderAnswer()}
            </View>
        )
    }
    const renderAnswer = () => {
        return (
            answer &&
            <Text style={styles.answerText}>
                {`You Responded "${state.consented ? t("consent.yes") : t("consent.no")}" `}
            </Text>
        )
    }
    const renderProcessing = () => {
        return (
            <View style={styles.answerDiv}>
                <Text style={styles.answerText}>Processing...</Text>


            </View>
        )
    }
    return (
        <View>
            {!recording && !record && granted && renderMic()}
            {recording && renderStop()}
            {!recording && record && !play && renderPlay()}
            {play && renderPause()}
            {processing && renderProcessing()}

        </View>
    )
}
Record.propTypes = {

    startRecording: PropTypes.func.isRequired,
    recording: PropTypes.bool.isRequired,
    record: PropTypes.string,
    stopRecording: PropTypes.func.isRequired,
    playRecording: PropTypes.func.isRequired,
    answer: PropTypes.string,
    granted: PropTypes.bool.isRequired,
    play: PropTypes.bool.isRequired,
    stopListening: PropTypes.func.isRequired,
    processing: PropTypes.bool.isRequired,
    state: PropTypes.object.isRequired,
}
Record.defaultProps = {
    startRecording: () => { },
    recording: false,
    record: null,
    stopRecording: () => { },
    playRecording: () => { },
    answer: null,
    granted: false,
    play: false,
    stopListening: () => { },
    processing: false,
    state: {}
}
export default Record