import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import HomeStack from "./src/components/navigations/HomeScreen";
import ConsentProvider from "./src/components/ConsentContext";

function App() {
  return (
    <>
      <ConsentProvider>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>

      </ConsentProvider>
      <Toast />
    </>
  );
}

export default App;
