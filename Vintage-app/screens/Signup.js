import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';
import * as SQLite from 'expo-sqlite';

// Initialize database
const initDB = async () => {
  const db = await SQLite.openDatabaseAsync('myApp');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      userID INTEGER PRIMARY KEY NOT NULL, 
      email TEXT NOT NULL, 
      username TEXT NOT NULL, 
      password TEXT NOT NULL);
  `);
    await db.runAsync('INSERT OR IGNORE INTO users (email, username, password) VALUES (?, ?, ?)', 'admin@gmail.com', 'admin', 'adminn');
    console.log("Created database");
    }
initDB();

const SignUp = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isValid, setIsValid] = useState(true);

 
  const checkIfUserExists = async () => {
    const db = await SQLite.openDatabaseAsync('myApp');
    try {
     
      const [existingUserByEmail] = await db.getAllAsync("SELECT * FROM users WHERE email = ?", [email]);
      const [existingUserByUsername] = await db.getAllAsync("SELECT * FROM users WHERE username = ?", [username]);

      if (existingUserByEmail) {
        setEmailError('Email already in use. Please use a different email.');
        return false;
      }

      if (existingUserByUsername) {
        setUsernameError('Username already exist. Please choose a different username.');
        return false;
      }

      setEmailError('');
      setUsernameError('');
      return true;

    } catch (e) {
      console.error("Error checking user: ", e);
      return false;
    }
  };

  const createUser = async () => {
    const db = await SQLite.openDatabaseAsync('myApp');
    try {
      const result = await db.runAsync('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, password]);
      console.log("User created successfully with ID:", result.lastInsertRowId);

      resetForm();

      navigation.navigate("Login");
    } catch (e) {
      console.error("Error inserting user: ", e);
      Alert.alert("Error", "while creating a user");
    }
  };

  const resetForm = () => {
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmailError('');
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setIsLoading(false);
    setIsValid(true); 
  };


  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let valid = true;

    if (!username) {
      setUsernameError("Please enter a username");
      valid = false;
    } else if (username.length < 6) {
      setUsernameError("Username should be at least 6 characters long");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!email) {
      setEmailError("Please enter an email");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter a password");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    setIsValid(valid);
    return valid;
  };

  const handleSignUp = async () => {
    if (isLoading) return;  

    if (validateForm()) {
      setIsLoading(true);  
      const userExists = await checkIfUserExists();
      if (userExists) {
        await createUser();
      } else {
        setIsLoading(false); 
      }
    }
  };

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.welcomeTitle}>Sign Up</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>USERNAME:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Username"
          value={username}
          onChangeText={setUsername}
        />
        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>EMAIL:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>PASSWORD:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>CONFIRM PASSWORD:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSignUp}
        disabled={isLoading}  // Disable the button while loading
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={[styles.linkText, {marginTop:20}]}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
