import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import { ScrollView } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {
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

  const clearGradeLevel = async () => {
    try {
      await AsyncStorage.removeItem('gradeLevel'); 
      setGradeLevel(''); 
      console.log('Grade level removed');
    } catch (error) {
      console.error('Error removing grade level:', error);
    }
  };

  useEffect(() => {
    fetchGradeLevel();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <View style={[styles.iconsContainer, { height: 60 }]}>
        <Image source={require('./../assets/logo1.png')} style={styles.logoStyle} />
        <Ionicons 
          name="exit" 
          size={32} 
          color="black" 
          onPress={() => {
            clearGradeLevel(); 
            navigation.goBack(); 
          }} 
        />
        <StatusBar style="auto" />
      </View>
      <View>
        <Text style={[styles.ceterText, {marginTop:-10}]}>
          Hello Kids, I’m Teacher Dobert. What Kind of Learning Mode you want?
        </Text>
        {gradeLevel ? (
          <Text style={[styles.ceterText, { marginTop: -80, fontWeight: 'bold' }]}>
            Your Grade Level: {gradeLevel}
          </Text>
        ) : null}
      </View>
      <ScrollView style={{ gap: 0, marginTop:-40 }}>
        <>
          <TouchableOpacity onPress={() => navigation.navigate('ReadingScreen')} style={styles.ImageParentContainer}>
            <View style={styles.imageContainer}>
              <Image source={require('./../assets/reading-removebg-preview.png')} style={styles.homeImage} resizeMode="contain" />
            </View>
            <Text style={[styles.imageLabel, { fontWeight: 900 }]}>READING</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('VideoScreen')} style={styles.ImageParentContainer}>
            <View style={styles.imageContainer}>
              <Image source={require('./../assets/watching-removebg-preview.png')} style={styles.homeImage} resizeMode="contain" />
            </View>
            <Text style={[styles.imageLabel, { fontWeight: 900, bottom: 95 }]}>WATCHING</Text>
          </TouchableOpacity>
        </>
       
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
