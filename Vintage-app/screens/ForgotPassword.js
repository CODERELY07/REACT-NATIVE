import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';
import * as SQLite from 'expo-sqlite';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigation = useNavigation();
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initializeDB = async () => {
      const database = await SQLite.openDatabaseAsync('myApp');
      setDb(database);
    };
    initializeDB(); 
  }, []);

  const handleForgotPassword = async () => {
    setEmailError('');
    setUsernameError('');
    setPasswordError('');

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      setEmailError("Please enter your email");
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      const result = await db.getAllAsync('SELECT * FROM users WHERE email = ?', [email]);

      if (result.length === 0) {
        setEmailError("Email not found in our system");
        return;
      }

     
      setUserId(result[0].userID); 
      setModalVisible(true);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "There was a problem with the password reset process.");
    }
  };

  const handleUsernameSubmit = async () => {
    try {
      const result = await db.getAllAsync('SELECT * FROM users WHERE userID = ? AND username = ?', [userId, username]);

      if (result.length === 0) {
        setUsernameError("Username not found");
        return;
      }

     
      setModalVisible(false);
      setShowPasswordFields(true);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "There was an error while validating the username.");
    }
  };

  const handlePasswordReset = async () => {
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      await db.runAsync('UPDATE users SET password = ? WHERE userID = ?', [newPassword, userId]);
      Alert.alert("Password Reset", "Your password has been successfully reset.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "There was a problem with resetting your password.");
    }
  };

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.welcomeTitle}>Forgot Password</Text>

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

      <TouchableOpacity style={styles.loginButton} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Username</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
              />
              {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleUsernameSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

     
      {showPasswordFields && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NEW PASSWORD:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter new password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CONFIRM PASSWORD:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Confirm new password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handlePasswordReset}>
            <Text style={styles.buttonText}>Submit New Password</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={[styles.linkText, {marginTop:15,textAlign:'center'}]}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
