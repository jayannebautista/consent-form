import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from "../style";

function Record({ startRecording = f => f, recording, record, stopRecording = f => f, playRecording = f => f, answer, granted }) {

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
            <TouchableOpacity style={styles.microphone} onPress={playRecording} >
                <Icon name="play" size={30} />
                {answer && <Text>{answer}</Text>}
            </TouchableOpacity>
        )
    }
    return (
        <View>
            {!recording && !record && granted && renderMic()}
            {recording && renderStop()}
            {!recording && record && renderPlay()}
        </View>
    )
}
export default Record