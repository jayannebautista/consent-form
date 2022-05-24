import React, { useState } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
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
        <View style={[styles.item, { paddingHorizontal: 40 }]}>
            <Text style={{ fontSize: 16, fontWeight: '500', width: "70%" }}>Details</Text>
            <Text style={{ fontSize: 16, fontWeight: '500', width: "40%" }}> Consent Given</Text>
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
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>{name}</Text>
                    <Text style={{ color: "#B8B8B8" }}>Language: {LANGUAGES[language]}</Text>
                </View>
                <View style={{ flexDirection: "row", width: '30%', justifyContent: 'space-evenly', alignContent: "center" }}>
                    <View>
                        <Icon name={`${consented ? "check" : "close"}`} size={25} />
                    </View>

                    <View>
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

            />

        </SafeAreaView>

    )
}
export default Consents;