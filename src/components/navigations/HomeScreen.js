import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConsentProvider from "../ConsentContext";
import FormTab from "./FormTabNavigation";
import ConsentsTab from "./ConsentTabNavigation";
import ConsentText from "../HomePage/ConsentText";
const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <ConsentProvider>
            <Stack.Navigator>
                <Stack.Screen name="FormTab" component={FormTab} options={{ headerShown: false }} />
                <Stack.Screen name="ConsentText" component={ConsentText} options={{ headerShown: false }} />
                <Stack.Screen name="ConsentsTab" component={ConsentsTab} options={{ headerShown: false }} />
            </Stack.Navigator>
        </ConsentProvider>
    )

}
export default HomeStack;