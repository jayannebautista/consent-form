import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConsentProvider from "../ConsentContext";
import FormTab from "./FormTabNavigation";
import ConsentsTab from "./ConsentTabNavigation";
import ConsentText from "../HomePage/ConsentText";
const Stack = createNativeStackNavigator();
const stackOptions = { animation: 'none', headerShown: false };
function HomeStack() {
    return (
        <ConsentProvider>
            <Stack.Navigator screenOptions={stackOptions}>
                <Stack.Screen name="FormTab" component={FormTab} />
                <Stack.Screen name="ConsentText" component={ConsentText} />
                <Stack.Screen name="ConsentsTab" component={ConsentsTab} />
            </Stack.Navigator>
        </ConsentProvider>
    )

}
export default HomeStack;