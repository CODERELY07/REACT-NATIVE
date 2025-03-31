import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [db, setDb] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (loggedIn === 'true') {
        navigation.navigate('Admin');
      }
    };

    checkLoginStatus();
    const initializeDB = async () => {
      try {
        const db = await SQLite.openDatabaseAsync('Elearn');
        setDb(db);
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS admin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL
          );
        `);

        const result = await db.getAllAsync('SELECT * FROM admin');
        if (result.length === 0) {
          await db.runAsync('INSERT INTO admin (username, password) VALUES (?, ?)', ['admin', 'admin123']);
        }
      } catch (e) {
        console.log(e);
      }
    };
    initializeDB();
  }, [navigation]);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    try {
      const result = await db.getAllAsync('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password]);

      if (result.length > 0) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.navigate('Admin'); 
      } else {
        setErrorMessage('Incorrect username or password.');
      }
    } catch (e) {
      console.log(e);
      setErrorMessage('An error occurred during login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      {username === '' && errorMessage && (
        <Text style={styles.errorText}>Please enter a username.</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {password === '' && errorMessage && (
        <Text style={styles.errorText}>Please enter a password.</Text>
      )}

      {errorMessage && username && password && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      <Button title="Login" color="#8E1A1A" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8E1A1A',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#8E1A1A',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});
