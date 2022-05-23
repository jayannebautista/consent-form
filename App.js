import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './src/components/navigations/HomeScreen';
const Stack = createNativeStackNavigator();

function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;
