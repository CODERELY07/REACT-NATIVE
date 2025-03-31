import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite'; 
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function VideoListScreen() {
  const [videoList, setVideoList] = useState([]);
  const navigation = useNavigation();
  const [gradeLevel, setGradeLevel] = useState('');

  const fetchGradeLevel = async () => {
    try {
      const storedGrade = await AsyncStorage.getItem('gradeLevel');
      if (storedGrade) {
        setGradeLevel(storedGrade); 
      } else {
        console.log('No grade level found.');
      }
    } catch (error) {
      console.error('Error retrieving grade level:', error);
    }
  };

const fetchVideos = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('mediaDB.db');
      const result = await db.getAllAsync(
        'SELECT * FROM media WHERE type = "video" AND gradeLevel = ?', [gradeLevel]
      );
      setVideoList(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchVideos(); 
  }, []);

  useEffect(() => {
    if (gradeLevel) {
      fetchVideos(); 
    }
  }, [gradeLevel]); 

  const handleVideoClick = (uri) => {
    navigation.navigate('VideoPlayer', { videoUri: uri });
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.videoItem} onPress={() => handleVideoClick(item.uri)}>
      <Text style={styles.videoTitle}>Video {item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video List</Text>

      {videoList.length === 0 ? (
        <Text style={styles.noVideoText}>No videos available</Text>
      ) : (
        <FlatList
          data={videoList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  videoItem: {
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    padding: 15,
    width: '80%',
    borderRadius: 5,
  },
  videoTitle: {
    fontSize: 18,
  },
  noVideoText: {
    fontSize: 18,
    color: 'gray',
  },
});
