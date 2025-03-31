import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

const initDB = async () => {
  console.log("Init Db");
  try {
    const db = await SQLite.openDatabaseAsync("friendfinder");
    await db.execAsync(`
       CREATE TABLE IF NOT EXISTS user (
        UserID INTEGER PRIMARY KEY AUTOINCREMENT,
        Username TEXT NOT NULL,
        Email TEXT NOT NULL,
        Password TEXT NOT NULL
      );
      `);
  } catch (e) {
    console.log("Error: ", e);
  }
};
initDB();

const login = async (
  email,
  password,
  navigation,
  setEmailError,
  setPasswordError,
  setPassword,
  setEmail
) => {
  console.log("Login attempt");

  try {
    const db = await SQLite.openDatabaseAsync("friendfinder");

    // Query to find the user with the provided email
    const user = await db.getAllAsync("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      setEmailError("No user found with this email.");
      return;
    }
    if (user[0].Password === password) {
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("username", user[0].Username);
      await AsyncStorage.setItem("userID", user[0].UserID.toString());
      setEmail("");
      setPassword("");
      console.log("Login successful");
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }], 
      });
    } else {
      setPasswordError("Incorrect Password.");
    }
  } catch (e) {
    console.log("Error: ", e);
  }
};

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Check if the user is already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      const userEmail = await AsyncStorage.getItem("userEmail");
      if (userEmail) {
        navigation.navigate("Main"); 
      }
    };
    checkLoginStatus();
  }, []);

  const signinValidation = () => {
    let valid = true;
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      login(
        email,
        password,
        navigation,
        setEmailError,
        setPasswordError,
        setPassword,
        setEmail
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#00A8E8" style={styles.icon} />
        <TextInput
          style={[styles.input, emailError ? styles.errorInput : null]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed"
          size={20}
          color="#00A8E8"
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, passwordError ? styles.errorInput : null]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={signinValidation}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setEmail("");
          setPassword("");
          setEmailError("");
          setPasswordError("");
          navigation.navigate("Screen1");
        }}
      >
        <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#E7ECEF",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#717070",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    color: "#333",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: -10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00A8E8",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchText: {
    textAlign: "center",
    color: "#717070",
    textDecorationLine: "underline",
  },
});

export default SigninScreen;
