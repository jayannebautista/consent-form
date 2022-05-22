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
function ConsentsTab() {

    return (
        <Tab.Navigator screenOptions={tabOptions}>
            <Tab.Screen name="Form" component={Form} />
            <Tab.Screen name="Consents" component={Consents} />
        </Tab.Navigator>
    )
}
export default ConsentsTab