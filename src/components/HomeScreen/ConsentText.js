import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import Tts from "react-native-tts";
import Voice from "@react-native-community/voice";
import AudioRecorderPlayer, {
    AudioEncoderAndroidType,
    AudioSourceAndroidType
} from "react-native-audio-recorder-player";
import RNFetchBlob from "rn-fetch-blob";
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import Record from "./Record";
import { useConsent } from "../ConsentContext";
import { styles } from "../Style";
import ActionButtons from "./ActionButtons";
import Header from "../Header";

const audioRecorderPlayer = new AudioRecorderPlayer();

function ConsentText({ navigation }) {

    const { t } = useTranslation();
    const yesValue = t("consent.yes").toLocaleLowerCase();
    const noValue = t("consent.no").toLocaleLowerCase();

    const { consent, addConsent } = useConsent();
    const [recording, setRecording] = useState(false);
    const [record, setRecord] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [play, setPlay] = useState(false);
    const [granted, setGranted] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [state, setState] = useState({ ...consent });


    useEffect(() => {

        const checkPermission = async () => {
            if (Platform.OS === "android") {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);
                if (
                    grants["android.permission.WRITE_EXTERNAL_STORAGE"] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants["android.permission.READ_EXTERNAL_STORAGE"] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants["android.permission.RECORD_AUDIO"] ===
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
        console.log("onSpeechStart: ", e);

    };

    const onSpeechRecognized = (e) => {
        console.log("onSpeechRecognized: ", e);

    };

    const onSpeechEnd = (e) => {
        console.log("onSpeechEnd", e);

    };

    const onSpeechError = (e) => {
        const { error } = e;
        if (error) {
            const { message } = e || {};
            if (message) {
                Toast.show({
                    type: 'info',
                    text1: 'Message',
                    text2: `${message}. Please try again`
                });
            }

        }


    };

    const updateSpeech = async (value) => {

        const prevState = await { ...state };

        if (value) {
            if (value.indexOf(yesValue) > -1) {

                setAnswer(yesValue);
                prevState.consented = 1;
                setState(prevState);
                setProcessing(false)


            }
            else if (value.indexOf(noValue) > -1) {
                setAnswer(noValue)
                prevState.consented = 0;

                setState(prevState);
                setProcessing(false)


            }
            else {
                prevState.consented = 0;
                setState(prevState);
                setAnswer(null)
                Toast.show({
                    type: 'info',
                    text1: 'Message',
                    text2: `Please answer "${t("consent.yes")}" or "${t("consent.no")}"`
                });
                setProcessing(false)
            }

        }
        else {
            Toast.show({
                type: 'info',
                text1: 'Message',
                text2: `Please answer "${t("consent.yes")}" or "${t("consent.no")}"`
            });
            prevState.consented = 0;
            setState(prevState);
            setAnswer(null)

            setProcessing(false)

        }
    }
    const onSpeechResults = (e) => {
        const { value } = e;
        updateSpeech(value);
    };

    const startRecording = async () => {
        try {
            await Tts.stop();

            await Voice.start(state.language);
            const dirs = RNFetchBlob.fs.dirs;
            const fileName = uuid.v4();
            const path = Platform.select({
                ios: `${fileName}.m4a`,
                android: `${dirs.CacheDir}/${fileName}.mp3`,
            });
            const audioSet = {
                AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
                AudioSourceAndroid: AudioSourceAndroidType.MIC
            };
            const uri = await audioRecorderPlayer.startRecorder(path, audioSet, false);

            audioRecorderPlayer.addRecordBackListener((e) => {
                console.log(e)
                return;
            });
            setRecording(true);
            setRecord(uri);

        } catch (e) {
            console.error(e);
        }
    };
    const stopRecording = async () => {
        try {

            await Voice.stop();
            const result = await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            setRecording(false);
            setProcessing(true)
        } catch (e) {
            console.log(e);
        }

    }
    const playRecording = async () => {
        try {
            const msg = await audioRecorderPlayer.startPlayer(record);
            const volume = await audioRecorderPlayer.setVolume(1.0);

            audioRecorderPlayer.addPlayBackListener((e) => {
                console.log(e);
            });
            setPlay(true)

        } catch (error) {

        }
    }
    const stopListening = () => {
        try {

            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
            setPlay(false)
        } catch (error) {

        }
    }
    const retry = () => {


        Voice.cancel();
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        clear();


    }
    const clear = () => {
        setRecord(null);
        setRecording(false)
        setPlay(false);
        setAnswer(null);
        setProcessing(false);

    }

    const onSaveConsent = () => {
        const newConsent = { ...state };
        newConsent.filePath = record;
        addConsent(newConsent).then(res => {
            if (res) {
                clear();
                navigation.navigate('ThankYou')
            }

        }).catch(err => {

        });

    }
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Header>Consent Form</Header>
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
                        processing={processing}
                        state={state}
                    />
                </View>
            </View>
            {!recording && record && <ActionButtons retry={retry} answer={answer} onSaveConsent={onSaveConsent} />}
        </View>
    )
}
export default ConsentText;