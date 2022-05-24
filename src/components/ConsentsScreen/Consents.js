import React, { useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { styles } from "../Style";
import Header from "../Header";
import { useConsent } from "../ConsentContext";

const LANGUAGES = {
    en: 'English',
    fr: 'French'
}
const ListHeader = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ fontSize: 20, fontWeight: '400' }}>Details</Text>
            <Text style={{ fontSize: 20, fontWeight: '400' }}> Consent Given</Text>
        </View >
    )
}
function Consents() {
    const { consentList } = useConsent();
    const renderItem = ({ index, item }) => {

        const { name, language, consented, filePath } = item || {};

        return (
            <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center', paddingHorizontal: 7, backgroundColor: index % 2 == 1 ? 'white' : '#eee' }}>
                <View style={{ width: "70%" }}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>{name}</Text>
                    <Text>Language {LANGUAGES[language]}</Text>
                </View>
                <View style={{ flexDirection: "row", width: '30%', justifyContent: 'space-around', alignContent: "center" }}>
                    <View style={{}}>
                        <Icon name={`${consented ? "check" : "close"}`} size={25} />
                    </View>
                    <View style={{}}>
                        <Icon name="play" size={25} />
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