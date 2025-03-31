// SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import * as SQLite from 'expo-sqlite';

const initDB = async() =>{
    console.log('Init Db');
    try{
      const db = await SQLite.openDatabaseAsync('friendfinder');
      await db.execAsync(`
       CREATE TABLE IF NOT EXISTS user (
        UserID INTEGER PRIMARY KEY AUTOINCREMENT,
        Username TEXT NOT NULL,
        Email TEXT NOT NULL,
        Password TEXT NOT NULL
      );
      `);
    }catch(e){
      console.log("Error: ", e);
    }
}
const createAccount = async(username, email, password,setEmailError) =>{
    console.log('Create Account');
  
    try{
    const db = await SQLite.openDatabaseAsync('friendfinder');

    const existingEmail  = await db.getAllAsync('SELECT Email FROM user WHERE Email = ?', [email]);
    if (existingEmail != "") {
       setEmailError("Email already exists");
        return ;
    }
      const result = await db.runAsync('INSERT INTO user (Username,Email, Password) VALUES (?, ?, ?)', [username, email, password]);
      console.log(result.lastInsertRowId, result.changes);
      return result.lastInsertRowId;
    }catch(e){
      console.log("Error: ", e);
      return null;
    }
  
}
initDB();
const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const signupValidation = async () => {
    let valid = true;

    setUsernameError('');
    setEmailError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('Username is required');
      valid = false;
    }
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (valid) {
      const result = await createAccount(username, email, password,setEmailError);

      try{
        if (result) {
            Alert.alert('Signup Successful');
            navigation.navigate('Signin');
          } 
      }catch(err){
        
        Alert.alert('Error', 'Failed to create an account. Please try again.', err);
         
      }
    
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signup</Text>

     
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color="#00A8E8" style={styles.icon} />
        <TextInput
          style={[styles.input, usernameError ? styles.errorInput : null]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}


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
        <Ionicons name="lock-closed" size={20} color="#00A8E8" style={styles.icon} />
        <TextInput
          style={[styles.input, passwordError ? styles.errorInput : null]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

     
      <TouchableOpacity style={styles.button} onPress={signupValidation}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.switchText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#E7ECEF',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#717070',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    color: '#333',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: -10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00A8E8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    textAlign: 'center',
    color: '#717070',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
