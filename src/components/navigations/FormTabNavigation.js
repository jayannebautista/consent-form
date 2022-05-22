import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Form from '../HomePage/Form';
import Consents from '../ConsentsPage/Consents';

const Tab = createBottomTabNavigator();
const tabOptions = {
    tabBarIconStyle: { display: 'none' },
    tabBarStyle: { position: 'absolute' },
    tabBarLabelStyle: {
        fontWeight: "600",
        fontSize: 15,
        textTransform: 'uppercase',

    },
    tabBarLabelPosition: "beside-icon",
    tabBarActiveTintColor: 'gray',
    tabBarInactiveTintColor: '#ccc',
    headerShown: false
}
function FormTab() {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Form" component={Form} options={tabOptions} />
            <Tab.Screen name="Consents" component={Consents} options={tabOptions} />
        </Tab.Navigator>
    )
}
export default FormTab