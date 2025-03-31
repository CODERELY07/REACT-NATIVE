import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ImageBackground,
  Modal,
  Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { openDatabase, getUserByUsername } from "../database";
import styles from "../styles/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [db, setDb] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [error, setError] = useState("");
  const [storedUsername, setStoredUsername] = useState(null);
  const [storedEmail, setStoredEmail] = useState(null);
  const [adminUsername, setAdminUsername] = useState(null);
 
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const database = await openDatabase(); 
        setDb(database);
        const adminUser = await database.getFirstAsync(
          "SELECT * FROM users WHERE username = ?",
          ["admin"]
        );
    
        if (!adminUser) {
          await database.runAsync(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            ["admin", "admin@gmail.com", "myadmin"]
          );
          console.log("Admin user created.");
        } else {
          console.log("Admin user already exists.");
        }
      } catch (error) {
        console.error("Error opening database:", error);
      }
    };
  
    const getStoredUser = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername); 
        }
      } catch (error) {
        console.error("Error fetching stored username:", error);
      }
    };
  
    initializeDatabase();
    getStoredUser();
  }, []);
  
  

  const validateInputs = () => {
    if (!username || !password) {
      setError("Both fields are required.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError(""); // Clear any previous errors
  
    if (!validateInputs()) return;
  
    if (!db) {
      setError("Database is not initialized.");
      return;
    }
  
    try {
      const user = await getUserByUsername(db, username); 
      console.log("User fetched from database:", user);
  
      if (!user) {
        setError("Invalid username or password.");
        return;
      }
  
      if (user.password !== password) {
        setError("Invalid username or password.");
        return;
      }
  
      // Save to AsyncStorage
      await AsyncStorage.setItem("username", username);
      if (user.email) {
        await AsyncStorage.setItem("email", user.email); 
      }
      if (username === "admin") {
       setAdminUsername(username);
      } 
   
    
      setUsername('');
      setPassword('');
      setError('');
      setModalMessage("Login successful!");
      setModalVisible(true);
    
      
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  

  const closeModal = () => {
    setModalVisible(false);
  
    if (modalMessage === "Login successful!") {
      if (adminUsername === "admin") {
        navigation.navigate("Admin"); 
      } else {
        navigation.navigate("Home"); 
      }
      console.log(adminUsername);
    }
  };
  
  return (
    <ImageBackground
      source={require("../assets/Backgroundphoto.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={[styles.bigTitle, styles.colorWhite]}>Iconic Recipes</Text>
        <Text style={[styles.subTitle, styles.colorWhite]}>Try at Home</Text>
        <View style={styles.loginContainer}>
          <Text style={[styles.headText, styles.colorWhite]}>Welcome Back!</Text>
          <View style={styles.inputContainer}>
            {error ? (
              <Text style={[styles.errorText, styles.colorRed]}>{error}</Text>
            ) : null}
            <View style={styles.inputBox}>
              <AntDesign name="user" size={24} color="#fff" />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#fff"
                value={storedUsername || username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.inputBox}>
              <MaterialIcons name="password" size={24} color="#fff" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <FontAwesome6
                  name={passwordVisible ? "eye" : "eye-slash"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.center}>
              <Text style={[styles.small, styles.colorWhite]}>
                Forgot Password?
              </Text>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={[styles.small, styles.colorWhite]}>
                  Don't have an account?{" "}
                  <Text
                    style={styles.signupText}
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    Sign up
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
              <Pressable
                style={[styles.button, styles.modalButton]}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
