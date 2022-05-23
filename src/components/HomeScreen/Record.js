import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from "../style";
import { useConsent } from "../ConsentContext";
import { useTranslation } from 'react-i18next';
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

}) {
    const { consent } = useConsent();
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
                {`You Responded "${consent.consented ? t("consent.yes") : t("consent.no")}" `}
            </Text>
        )
    }

    return (
        <View>
            {!recording && !record && granted && renderMic()}
            {recording && renderStop()}
            {!recording && record && !play && renderPlay()}
            {play && renderPause()}

        </View>
    )
}
export default Record