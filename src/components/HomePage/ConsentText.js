import React from "react";
import { View, Text } from "react-native";
import { useTranslation, Trans } from 'react-i18next';
function ConsentText() {
    const { t, i18n } = useTranslation();

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>

            <Text>Consent Text</Text>
            <Text>{t('consent.part1')}</Text>
            <Text>{t('consent.part2')}</Text>

        </View>
    )
}
export default ConsentText;