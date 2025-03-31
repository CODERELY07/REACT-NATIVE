import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";


const initDB = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("sorsogonExplorer");

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS users (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullName TEXT NOT NULL,
          username TEXT NOT NULL UNIQUE,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `);
    console.log("DB Created");
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        const adminLogin = await AsyncStorage.getItem("adminLogin");
        console.log(isLoggedIn);
        console.log(adminLogin);
        if (isLoggedIn === "true") {
          navigation.replace("HomeDrawer");
        }
        if (adminLogin === "true") {
          navigation.replace("AdminDrawer");
        }
      } catch (error) {
        console.error("Error checking login state:", error);
      }
    };

    checkLoginState();
  }, [navigation]);

  const createAdmin = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("sorsogonExplorer");
      await db.runAsync(
        "INSERT INTO users (username, password,fullName,email) VALUES (?, ?, ?, ?)",
        ["admin", "adminPass", "admin", "admin@gmail.com"]
      );
      console.log("Admin created successfully!");
    } catch (e) {
      console.log(e);
    }
  };
  const fetchAllUsers = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("sorsogonExplorer");
      const result = await db.getAllAsync("SELECT * FROM users");
      console.log(result);
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  useState(() => {
    initDB();
    createAdmin();
    fetchAllUsers();
  }, []);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Username and Password are required.");
      return;
    }

    try {
      const db = await SQLite.openDatabaseAsync("sorsogonExplorer");
      const result = await db.getFirstAsync(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password]
      );

      if (!result || result == null) {
        setError("No user Found!");
        return;
      }
      if (result.username == "admin" && result.password == "adminPass") {
        alert("Admin successfully Log In!");
        await AsyncStorage.setItem("adminLogin", "true");
        await AsyncStorage.setItem("username", username);
        const loggedInStatus = await AsyncStorage.getItem("adminLogin");
        console.log("Logged in status:", loggedInStatus);
        setUsername("");
        setPassword("");
        setError("");
        navigation.replace("AdminDrawer");
        return;
      }
      if (result) {
        alert("Login successful!");
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("username", username);
        const loggedInStatus = await AsyncStorage.getItem("isLoggedIn");
        console.log("Logged in status:", loggedInStatus);
        setUsername("");
        setPassword("");
        setError("");
        navigation.replace("HomeDrawer");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Database error:", err);
      setError("Error. Please try again.");
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingBottom: 20,
          width: "95%",
        }}
      >
        <AntDesign
          name="arrowleft"
          size={34}
          color="#fff"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{ color: "#fff", fontSize: 24 }}>Sorsogon Explorer</Text>
      </View>
      <View style={styles.whiteBackground}>
        <Text style={styles.loginHeader}>
          Welcome Back!{"\n"} Log in to your account
        </Text>

        <TextInput
          style={[styles.inputField, error && styles.errorInput]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={[styles.inputField, error && styles.errorInput]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signUpText}>
          Don't have an account?{" "}
          <Text
            style={styles.signUpLink}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default LoginScreen;
