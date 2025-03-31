import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Text, View, Image,Button } from 'react-native';
import styles from './../styles';

function HomeScreen() {
  const [imageList, setImageList] = useState([]);
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initializeDB = async () => {
      const database = await SQLite.openDatabaseAsync('sorsogonExplorer');
      setDb(database);
      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS attractions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          path TEXT,
          title TEXT
        );
        CREATE TABLE IF NOT EXISTS recent_updates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          description TEXT
        );
      `);
      fetchImages(database);
      fetchRecentUpdates(database); 
    };
    initializeDB();
  }, []);

  const fetchImages = async (database) => {
    const allRows = await database.getAllAsync('SELECT * FROM attractions');
    setImageList(allRows);
    // Log each row's path
    allRows.forEach((row) => {
      console.log(row.path);
    });
  };

  const fetchRecentUpdates = async (database) => {
    const result = await database.getAllAsync('SELECT * FROM recent_updates');
    setRecentUpdates(result); 
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <Text style={styles.headerText}>Sorsogon Explorer.</Text>
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>
      <View>
        <Text style={styles.descriptionText}>
          Discover the hidden gems of Sorsogon, a province brimming with natural beauty, rich history, and warm hospitality. Let Sorsogon Explorer be your guide to unforgettable adventures in this paradise.
        </Text>
      </View>
      <View>
        <Text style={styles.sectionTitle}>Featured Attractions</Text>
        <View style={styles.attractionsContainer}>
          {imageList.length > 0 ? (
            imageList.map((image, index) => (
              <View key={index} style={styles.boxContainer}>
                <View style={styles.boxImageHolder}>
                  <Image 
                    source={{ uri: image.path }} 
                    style={styles.placeImage} 
                  />
                </View>
                <Text style={styles.attractionText}>{image.title}</Text>
              </View>
            ))
          ) : (
            <Text>No images available.</Text>
          )}
        </View>
      </View>

      {recentUpdates.length > 0 ? (
        <View style={styles.updatesContainer}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          {recentUpdates.map((update, index) => (
            <Text key={index} style={styles.updateText}>
              <Text style={styles.highlight}>{update.title}: </Text>
              <Text>{update.description}</Text>
            </Text>
          ))}
        </View>
      ) : (
        <Text>No recent updates available.</Text>
      )}
    </ScrollView>
  );
}

export default HomeScreen;
