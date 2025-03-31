import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import styles from './../styles';

// Initialize the database and create table if not exists
const initializeDb = async () => {
  const db = await SQLite.openDatabaseAsync('sorsogonExplorer');
  
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY NOT NULL,
      feedback TEXT NOT NULL,
      username TEXT NOT NULL
    );
  `);
};
initializeDb();

// Insert feedback into the database
const insertFeedback = async (feedback, username, callback) => {
  try {
    const db = await SQLite.openDatabaseAsync('sorsogonExplorer');
    // Ensure that both feedback and username are passed correctly
    const result = await db.runAsync('INSERT INTO feedback (feedback, username) VALUES (?, ?)', feedback, username);
    callback(null, result);  // Return the result in the callback
  } catch (error) {
    callback(error, null);  // Return the error in the callback
  }
};

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [user, setUser] = useState('');

  // Fetch username from AsyncStorage
  const getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      if (username) {
        setUser(username); // Save the username into state
        console.log("Username fetched from AsyncStorage: ", username);
      } else {
        Alert.alert('Error', 'No username found in AsyncStorage');
      }
    } catch (e) {
      console.log("Error fetching username: ", e);
    }
  };

  useEffect(() => {
    initializeDb();
    getUsername(); // Retrieve username when the component mounts
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    if (feedback.trim() && user) {
      // Call insertFeedback and pass feedback and username
      insertFeedback(feedback, user, (error, result) => {
        if (error) {
          Alert.alert('Error', 'Failed to save feedback');
          console.log('Error inserting feedback: ', error);
        } else {
          Alert.alert('Success', 'Thank you for your feedback!');
          setFeedback('');  // Clear feedback input after success
        }
      });
    } else {
      Alert.alert('Error', 'Please enter feedback and ensure username is set');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feedback</Text>
      <Text style={styles.description}>
        Share your thoughts and help us improve your experience!
      </Text>
      <TextInput
        style={styles.textArea}
        placeholder="Your feedback here..."
        multiline
        numberOfLines={6}
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;
