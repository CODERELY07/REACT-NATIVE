import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";

export default function LoginScreen() {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.logoText}>
        RunMates
      </Text>
      <Image
        source={require("./../../../assets/images/running1.jpg")}
        style={styles.image}
      />
      <Text style={styles.descriptionText}>
        Find your running partner and thrive with RunMates!
      </Text>
      <TouchableOpacity onPress={() => console.log("button press")}>
        <Text style={styles.loginButton}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 20,
    objectFit: "contain",
  },
  image: {
    width: "90%",
    height: 300,
    display: "block",
    margin: "auto",
    borderRadius: 8,
    marginBottom: 30,
    padding: 20,
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.SoftWhite,
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
    padding: 30,
    textShadowColor: "#000000",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  descriptionText: {
    width: "100%",
    textAlign: "center",
    lineHeight: 28,
    margin: "auto",
    color: Colors.SoftWhite,
    fontSize: 24,
    padding: 20,
    textShadowColor: "#000000",
    textShadowOffset: { width: 0.5, height: 0.5 },
  },
  loginButton: {
    backgroundColor: Colors.ElectricPurple,
    color: Colors.SoftWhite,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    width: "90%",
    margin: "auto",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "#000000",
    textShadowOffset: { width: 0.5, height: 0.5 },
  },
});
