import React from "react";
import { View, Text } from "react-native";
import { useTranslation, Trans } from 'react-i18next';
import { styles } from "../Style";
function ConsentText() {
    const { t, i18n } = useTranslation();

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.header}>Consent Form</Text>
                </View>
                <View style={styles.consentDiv}>
                    <Text style={styles.consentText}>{t('consent.part1')}</Text>

                </View>
                <View style={styles.consentDiv}>
                    <Text style={styles.consentText}>{t('consent.part2')}</Text>
                </View>
            </View>
        </View>
    )
}
export default ConsentText;