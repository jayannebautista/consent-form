import React from "react";
import { View, Text } from "react-native";
import { styles } from "./Style";
function Header({ children }) {
    return (
        <View style={styles.center}>
            <Text style={styles.header}>{children}</Text>
        </View>
    )
}
export default Header;