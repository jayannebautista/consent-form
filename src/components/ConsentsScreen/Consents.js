import React, { useState } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import AudioRecorderPlayer, {
    AudioEncoderAndroidType,
    AudioSourceAndroidType
} from "react-native-audio-recorder-player";
import { styles } from "../Style";
import Header from "../Header";
import { useConsent } from "../ConsentContext";

const audioRecorderPlayer = new AudioRecorderPlayer();
const LANGUAGES = {
    en: 'English',
    fr: 'French'
}
const ListHeader = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ fontSize: 20, fontWeight: '500' }}>Details</Text>
            <Text style={{ fontSize: 20, fontWeight: '500' }}> Consent Given</Text>
        </View >
    )
}
function Consents() {
    const { consentList } = useConsent();
    const [selected, setSelected] = useState(null);

    const playRecording = async (record, index) => {
        try {
            const msg = await audioRecorderPlayer.startPlayer(record);
            const volume = await audioRecorderPlayer.setVolume(1.0);

            audioRecorderPlayer.addPlayBackListener((e) => {

                const { currentPosition, duration } = e || {};
                if (currentPosition == duration) {
                    audioRecorderPlayer.stopPlayer();
                    audioRecorderPlayer.removePlayBackListener();
                }
                setSelected(index);
            });



        } catch (error) {

        }
    }

    const stopListening = (index) => {
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setSelected(null)
    }
    const renderItem = ({ index, item }) => {

        const { name, language, consented, filePath } = item || {};

        return (
            <View style={[styles.item, { backgroundColor: index % 2 == 1 ? "#FFF" : "#EEE" }]}>
                <View style={{ width: "70%" }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>{name}</Text>
                    <Text>Language {LANGUAGES[language]}</Text>
                </View>
                <View style={{ flexDirection: "row", width: '30%', justifyContent: 'space-around', alignContent: "center" }}>
                    <View style={{}}>
                        <Icon name={`${consented ? "check" : "close"}`} size={25} />
                    </View>

                    <View style={{}}>
                        {selected === index ?
                            <TouchableOpacity onPress={() => { stopListening(index) }}>
                                <Icon name="pausecircle" size={25} />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => { playRecording(filePath, index) }}>
                                <Icon name="play" size={25} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <Header>All Consents</Header>
            </View>

            <FlatList data={consentList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={<ListHeader />}
                style={{ paddingHorizontal: 40 }}
            />

        </SafeAreaView>

    )
}
export default Consents;