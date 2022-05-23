import React, { useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
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

        const { name, language } = item || {};

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text >{name}</Text>
                    <Text>Language {LANGUAGES[language]}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text>Yes</Text>
                    <Text>Test</Text>
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