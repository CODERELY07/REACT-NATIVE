import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, StatusBar } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from '../styles/styles';
import * as SQLite from 'expo-sqlite'; 
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

function VideoScreen() {
  const [videoList, setVideoList] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const navigation = useNavigation(); 

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
      const db = await SQLite.openDatabaseAsync('Elearn');
      const result = await db.getAllAsync(
        'SELECT * FROM media WHERE gradeLevel = ?', [gradeLevel]
      );
      setVideoList(result);
      setFilteredVideos(result); 
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGradeLevel();
  }, []);

  useEffect(() => {
    if (gradeLevel) {
      fetchVideos(); 
    }
  }, [gradeLevel]); 


  const handleVideoClick = (uri, id) => {
    incrementViews(id)
    navigation.navigate('VideoPlayer', { videoUri: uri });
  };
  
  const incrementViews = async (id) => {
    try {
      const db = await SQLite.openDatabaseAsync('Elearn');
      await db.runAsync('UPDATE media SET views = views + 1 WHERE id = ?', [id]);
      fetchVideos();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === '') {
      setFilteredVideos(videoList); 
    } else {
      const filtered = videoList.filter((item) => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.uploader.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideos(filtered); 
    }
  };

    useEffect(() => {
      const initDB = async () => {
        try {
          const db = await SQLite.openDatabaseAsync('Elearn');
    
          await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS media (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              uri TEXT NOT NULL,
              type TEXT NOT NULL,
              title TEXT,
              uploader TEXT,
              gradeLevel TEXT, 
              views INTEGER DEFAULT 0
            );
          `);
        } catch (e) {
          console.log(e);
        }
      };
  
      initDB();

    }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredVideos(videoList); 
    }
  }, [searchQuery]); 

  console.log(gradeLevel)

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.videoItem} onPress={() => handleVideoClick(item.uri, item.id)}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Image
          source={{ uri: item.uri }} 
          style={{ width: 150, height: 100 }} 
          resizeMode="cover"
        />
        <View style={{ width: '50%' }}>
          <Text style={{ paddingTop: 5, fontWeight: 'bold' }}>{item.title || 'Untitled Video'}</Text>
          <Text style={{ marginTop: 10, fontSize: 12 }}>{item.uploader || 'Unknown'}</Text>
          <Text style={{ fontSize: 12 }}>Views: {item.views}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#fff', marginTop: -70 }]}>
      <View style={styles.iconsContainer}>
        <Image source={require('./../assets/logo1.png')} style={styles.logoStyle} />
        <AntDesign name="questioncircle" size={32} color="black" />
        <StatusBar style="auto" />
      </View>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.search} 
          placeholder="Search..." 
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} 
        />
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearchClick}>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredVideos} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={<Text style={{ fontSize: 18, color: 'gray' }}>No videos available</Text>}
      />
    </View>
  );
}

export default VideoScreen;
