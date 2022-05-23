import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid, Platform } from "react-native";
import { useTranslation } from 'react-i18next';
import Tts from 'react-native-tts';
import Voice from "@react-native-community/voice"
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
    PlayBackType,
    RecordBackType,
} from "react-native-audio-recorder-player";
import Record from "./Record";
import { useConsent } from "../ConsentContext";
import { styles } from "../style";
import ActionButtons from "./ActionButtons";

const audioRecorderPlayer = new AudioRecorderPlayer();

function ConsentText() {

    const { t } = useTranslation();
    const yesValue = t("consent.yes").toLocaleLowerCase();
    const noValue = t("consent.no").toLocaleLowerCase();
    const { consent, updateConsent } = useConsent();
    const [recording, setRecording] = useState(false);
    const [record, setRecord] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [play, setPlay] = useState(false);
    const [granted, setGranted] = useState(false);

    useEffect(() => {
        //tts
        const checkPermission = async () => {
            if (Platform.OS === 'android') {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);
                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] ===
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    setGranted(true);
                } else {

                    return;
                }
            }

        };

        checkPermission();

        Tts.speak(t("consent.speech"));
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechRecognized = onSpeechRecognized;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
            Tts.stop();


        };
    }, []);
    const onSpeechStart = (e) => {
        console.log('onSpeechStart: ', e);

    };

    const onSpeechRecognized = (e) => {
        console.log('onSpeechRecognized: ', e);

    };

    const onSpeechEnd = (e) => {

        console.log('onSpeechEnd', e);
    };

    const onSpeechError = (e) => {
        console.log('onSpeechError: ', e);

    };

    const onSpeechResults = async (e) => {
        const { value } = e;

        if (value.indexOf(yesValue) > -1) {
            await setAnswer(yesValue);

            updateConsent('consented', 1);
            return;
        }
        else if (value.indexOf(noValue) > -1) {
            await setAnswer(noValue)
            updateConsent('consented', 0);
            return;
        }
        else {
            await setAnswer(null)
        }

    };

    const startRecording = async () => {
        try {
            await Tts.stop();
            const audioSet = {
                AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
                AudioSourceAndroid: AudioSourceAndroidType.MIC,
                AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
                AVNumberOfChannelsKeyIOS: 2,
                AVFormatIDKeyIOS: AVEncodingOption.aac,
            };
            await Voice.start(consent.language);
            const uri = await audioRecorderPlayer.startRecorder(
                undefined,
                audioSet,
            );
            audioRecorderPlayer.addRecordBackListener((e) => {
                console.log(e)
                return;
            });
            await setRecording(true);
            await setRecord(uri);
        } catch (e) {
            console.error(e);
        }
    };
    const stopRecording = async () => {
        try {

            await Voice.stop();
            const result = await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            await setRecording(false);

        } catch (e) {
            console.log(e);
        }

    }
    const playRecording = async () => {
        try {
            const msg = await audioRecorderPlayer.startPlayer();
            const volume = await audioRecorderPlayer.setVolume(1.0);
            console.log(`file: ${msg}`, `volume: ${volume}`);
            audioRecorderPlayer.addPlayBackListener((e) => {
                console.log(e);
            });
            setPlay(true)

        } catch (error) {

        }
    }
    const stopListening = async () => {
        try {

            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
            setPlay(false)
        } catch (error) {

        }
    }
    const retry = async () => {
        await Voice.cancel();
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setRecord(null);
        setRecording(false)
        setPlay(false);
        setAnswer(null);
    }

    const onSaveConsent = () => {
        console.log(consent);
    }
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.header}>Consent Form</Text>
                </View>
                <View style={styles.consentDiv}>
                    <Text style={styles.consentText}>{t("consent.part1")}</Text>

                </View>
                <View style={styles.consentDiv}>
                    <Text style={styles.consentText}>{t("consent.part2")}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.center}>
                    <Record
                        startRecording={startRecording}
                        record={record}
                        recording={recording}
                        stopRecording={stopRecording}
                        playRecording={playRecording}
                        answer={answer}
                        granted={granted}
                        play={play}
                        stopListening={stopListening}

                    />
                </View>
            </View>
            {!recording && record && <ActionButtons retry={retry} answer={answer} onSaveConsent={onSaveConsent} />}
        </View>
    )
}
export default ConsentText;