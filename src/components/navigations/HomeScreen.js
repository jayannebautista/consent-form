import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConsentProvider from "../ConsentContext";
import FormTab from "./FormTabNavigation";
import ConsentsTab from "./ConsentTabNavigation";
import ConsentText from "../HomeScreen/ConsentText";
import ThankYou from "../HomeScreen/ThankYou";
const Stack = createNativeStackNavigator();
const stackOptions = { animation: 'none', headerShown: false };
function HomeStack() {
    return (
        <ConsentProvider>
            <Stack.Navigator screenOptions={stackOptions}>
                <Stack.Screen name="FormTab" component={FormTab} />
                <Stack.Screen name="ConsentText" component={ConsentText} />
                <Stack.Screen name="ConsentsTab" component={ConsentsTab} />
                <Stack.Screen name="ThankYou" component={ThankYou} />
            </Stack.Navigator>
        </ConsentProvider>
    )

}
export default HomeStack;