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
import { openDatabase, addUser, getUserByEmail } from "../database";
import styles from "../styles/styles";

const SignUpScreen = ({ navigation }) => {
  const [db, setDb] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [error, setError] = useState("");

 
  useEffect(() => {
    const initDb = async () => {
      const db = await openDatabase();
      setDb(db);
    };
    initDb();
  }, []);

  const validateInputs = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setError(""); 
    if (!validateInputs()) return;
  
    if (!db) {
      setError("Database is not initialized.");
      return;
    }
  
    try {

      const existingUserByEmail = await db.getFirstAsync('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUserByEmail) {
        setError("Email is already in use.");
        return;
      }
  

      const existingUserByUsername = await db.getFirstAsync('SELECT * FROM users WHERE username = ?', [username]);
      if (existingUserByUsername) {
        setError("Username is already exists.");
        return;
      }
  
     
      const result = await db.runAsync('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
      
      if (result.changes > 0) {
        setModalMessage("Account created successfully!");
        setModalVisible(true);
      } else {
        setModalMessage("Failed to create account.");
        setModalVisible(true);
      }
    } catch (error) {
      setError("An error occurred during the sign-up process.");
      console.error(error);
    }
  };
  
  

  const closeModal = () => {
    setModalVisible(false);
    if (modalMessage === "Account created successfully!") {
      navigation.navigate("Login");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Backgroundphoto.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={[styles.bigTitle, styles.colorWhite]}>Sign Up</Text>
        <Text style={[styles.subTitle, styles.colorWhite]}>
          Create your account
        </Text>
        <View style={styles.signupContainer}>
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
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.inputBox}>
              <MaterialIcons name="email" size={24} color="#fff" />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                value={email}
                onChangeText={setEmail}
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
            <View style={styles.inputBox}>
              <MaterialIcons name="password" size={24} color="#fff" />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#fff"
                secureTextEntry={!confirmPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                onPress={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                <FontAwesome6
                  name={confirmPasswordVisible ? "eye" : "eye-slash"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={handleSignUp}
              style={[styles.button, styles.signupButton]}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
              style={[styles.button, styles.googleButton]}
            >
            
              <Text style={styles.googleButtonText}>Already Have an Account? Login</Text>
            </TouchableOpacity>
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

export default SignUpScreen;
