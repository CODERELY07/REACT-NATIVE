import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import styles from '../styles/styles';

function ReadingScreen({navigation}) {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjects, setSubjects] = useState([]); 
    const [gradeLevel, setGradeLevel] = useState(null); 

    useEffect(() => {
      const fetchGradeLevel = async () => {
        try {
          const storedGradeLevel = await AsyncStorage.getItem('gradeLevel');
          setGradeLevel(storedGradeLevel); 
        } catch (e) {
          console.error('Error fetching gradeLevel from AsyncStorage:', e);
        }
      };

      fetchGradeLevel();
    }, []);
    
      useEffect(() => {
        const initDB = async () => {
          try {
            const db = await SQLite.openDatabaseAsync('Elearn');
            await db.execAsync(`
              PRAGMA journal_mode = WAL;
              CREATE TABLE IF NOT EXISTS readings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                subject TEXT NOT NULL,
                title TEXT NOT NULL,
                lesson TEXT NOT NULL,
                short_description TEXT,
                gradeLevel TEXT
              );
            `);
          } catch (e) {
            console.log(e);
          }
        };
    
        initDB();
      }, []);

    useEffect(() => {
      const fetchSubjects = async () => {
        if (gradeLevel) {
          try {
            const db = await SQLite.openDatabaseAsync('Elearn');
            const result = await db.getAllAsync('SELECT DISTINCT subject FROM readings WHERE gradeLevel = ?', [gradeLevel]);
            const subjectsData = result.map(item => item.subject);
            const fetchedSubjects = await Promise.all(subjectsData.map(async (subject) => {
              const topicsResult = await db.getAllAsync('SELECT title, short_description, lesson FROM readings WHERE subject = ? AND gradeLevel = ?', [subject, gradeLevel]);
              return {
                name: subject,
                topics: topicsResult,
              };
            }));
            setSubjects(fetchedSubjects);
          } catch (e) {
            console.error('Error fetching subjects:', e);
          }
        }
      };

      if (gradeLevel) {
        fetchSubjects();
      }
    }, [gradeLevel]);

    const handleSubjectPress = (subject) => {
      setSelectedSubject(subject);
    };

    const handleReadPress = (topic) => {
      navigation.navigate('LessonScreen', { topic: topic }); 
    };

    return (
      <View style={{ backgroundColor: '#fff', paddingTop: 70, flex: 1, marginTop: -60 }}>
        <View style={[styles.iconsContainer, { marginTop: -80 }]}>
          <Image source={require('./../assets/logo1.png')} style={styles.logoStyle} />
          <Ionicons name="exit" size={32} color="black" onPress={() => navigation.goBack()} />
          <StatusBar style="auto" />
        </View>
        <ScrollView style={{ marginTop: -40, height: 40 }} horizontal showsHorizontalScrollIndicator={false}>
          {subjects.map((subject, index) => (
            <TouchableOpacity key={index} onPress={() => handleSubjectPress(subject)}>
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: selectedSubject?.name === subject.name ? 18 : 16,
                  fontWeight: 'normal',
                }}
              >
                {subject.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView>
          <View style={{ alignItems: 'center', width: '90%', marginRight: 'auto', marginLeft: 'auto', marginTop: 20 }}>
            {selectedSubject ? (
              selectedSubject.topics.map((topic, index) => (
                <View key={index} style={{ marginBottom: 20, alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{topic.title}</Text>
                  <Text style={{ marginTop: 5, textAlign: 'center' }}>{topic.short_description}</Text>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      backgroundColor: '#007BFF',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 20,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 4,
                      width: 80,
                      elevation: 5,
                    }}
                    onPress={() => handleReadPress(topic)} 
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Read</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text>Select a subject to see details.</Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
}

export default ReadingScreen;
