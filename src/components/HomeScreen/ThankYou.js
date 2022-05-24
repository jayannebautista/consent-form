
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "../Style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import OIcon from "react-native-vector-icons/Octicons"
import Header from "../Header";
import NextButton from "./NextButton";


function ThankYou({ navigation }) {
    const onNext = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'ConsentsTab' }]
        })
    }
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Header>Consent Form</Header>
            </View>
            <View style={styles.answerDiv}>
                <View style={styles.microphone}  >
                    <OIcon name="checklist" size={30} />
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                        Thank You, your consent has been successfully saved!
                    </Text>
                </View>


            </View>
            <View style={styles.container}>
                <View style={styles.center}>
                    <NextButton onNext={onNext} title='View all consents' />
                </View>
            </View>


        </View>

    )
}
export default ThankYou;