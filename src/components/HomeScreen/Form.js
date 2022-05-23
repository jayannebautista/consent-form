import React from "react";
import { View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useConsent } from "../ConsentContext";
import { styles } from "../style";
import NextButton from "./NextButton";

function Form({ navigation }) {
    const { updateConsent, consent } = useConsent();
    const onNext = () => {
        navigation.navigate('ConsentText')
    }
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.header}>Consent Form</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.formDiv}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            placeholder="Enter your name"
                            value={consent.name}
                            style={styles.textInput}
                            onChangeText={(value) => { updateConsent("name", value) }}
                        />
                    </View>
                    <View style={styles.formDiv}>
                        <View>
                            <Text style={styles.label}>Language</Text>
                        </View>
                        <View style={styles.textInput}>
                            <Picker
                                selectedValue={consent.language}
                                onValueChange={(itemValue, itemIndex) =>
                                    updateConsent("language", itemValue)
                                }
                            >
                                <Picker.Item style={styles.placeholder} value="" label="Select Language" enabled={false} />
                                <Picker.Item label="English" value="en" />
                                <Picker.Item label="French" value="fr" />
                            </Picker>
                        </View>
                    </View>

                </View>
                <NextButton onNext={onNext} />
            </View>
        </View>
    )
}
export default Form;