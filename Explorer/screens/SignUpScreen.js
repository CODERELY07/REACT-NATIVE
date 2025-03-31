import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './../styles';
import { AntDesign } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

const initDB = async ()=>{
    try{
      const db = await SQLite.openDatabaseAsync('sorsogonExplorer');
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
    }catch(e){
        console.log("ERROR: ", e);
    }
}

export default function SignUpScreen({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
    useState(()=>{
        initDB();
    }, [])
    const validateInputs = () => {
      if (!fullName.trim()) {
        setError('Full Name is required.');
        return false;
      }
      if (!username.trim()) {
        setError('Username is required.');
        return false;
      }
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Valid email is required.');
        return false;
      }
      if (!password) {
        setError('Password is required.');
        return false;
      }
      if(password.length < 6){
        setError('Password Must be atleast 6 characters long!');
        return false;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return false;
      }
      setError('');
      return true;
    };
  
    const handleSignUp = async () => {
      if (!validateInputs()) return;
  
      try {
        const db = await SQLite.openDatabaseAsync('sorsogonExplorer');
  
        const result = await db.runAsync(
          'INSERT INTO users (fullName, username, email, password) VALUES (?, ?, ?, ?)',
          [fullName, username, email, password]
        );
        console.log(result.lastInsertRowId, result.changes);
        alert('Account created successfully!');
        setUsername('');
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
        navigation.navigate('Login');
      } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
          setError('Username or Email already exists.');
        } else {
          console.error('Database error:', error);
          alert('An error occurred while creating your account.');
        }
      }
    };
  
    return (
      <View style={styles.loginContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 20, width: '95%' }}>
          <AntDesign name="arrowleft" size={34} color="#fff" onPress={() => { navigation.goBack(); }} />
          <Text style={{ color: '#fff', fontSize: 24 }}>Sorsogon Explorer</Text>
        </View>
        <View style={styles.whiteBackground}>
          <Text style={[styles.loginHeader, { marginTop: -80 }]}>Welcome!{"\n"} Create your account</Text>
  
          <TextInput
            style={[styles.inputField, error && styles.errorInput]}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
  
          <TextInput
            style={[styles.inputField, error && styles.errorInput]}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
  
          <TextInput
            style={[styles.inputField, error && styles.errorInput]}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
  
          <TextInput
            style={[styles.inputField, error && styles.errorInput]}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
  
          <TextInput
            style={[styles.inputField, error && styles.errorInput]}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
  
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
  
          <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
  
          <Text style={styles.signUpText}>
            Already have an account?{' '}
            <Text style={styles.signUpLink} onPress={() => { navigation.navigate('Login'); }}>Log In</Text>
          </Text>
        </View>
      </View>
    );
  }

