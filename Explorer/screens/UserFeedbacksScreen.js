import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import styles from './../styles';

const initializeDb = async () => {
  const db = await SQLite.openDatabaseAsync('sorsogonExplorer');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY NOT NULL,
      feedback TEXT NOT NULL,
      username TEXT NOT NULL,
    );
  `);
};

const fetchFeedback = async (callback) => {
  try {
    const db = await SQLite.openDatabaseAsync('sorsogonExplorer');
    const rows = await db.getAllAsync('SELECT * FROM feedback');
    callback(null, rows);
  } catch (error) {
    callback(error, null);
  }
};

const UserFeedbacksScreen = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchFeedback((error, result) => {
      if (error) {
        console.error('Error fetching feedback:', error);
      } else {
        setFeedbackList(result);
      }
    });

    initializeDb();
  }, []);

  return (

      <View style={styles.container}>
        <Text style={styles.feadbackHeader}>Feedbacks From Users</Text>
        <ScrollView style={styles.feedbackList}>
          {feedbackList.length > 0 ? (
            feedbackList.map((item) => (
              <View key={item.id} style={styles.feedbackItem}>
                <Text style={styles.usernameFeedback}>{item.username}</Text>
                <Text style={styles.feedbackText}>{item.feedback}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noFeedbackText}>No feedback available.</Text>
          )}
        </ScrollView>
      </View>
    
  );
};

export default UserFeedbacksScreen;
