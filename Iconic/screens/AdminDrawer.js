import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { NavigationContainer } from "@react-navigation/native";

// Your AdminScreen Component
function AdminScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AdminScreen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Admin">
        <Drawer.Screen name="Admin" component={AdminScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
