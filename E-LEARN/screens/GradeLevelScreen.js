import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

function GradeLevelScreen({ navigation }) {
  const handleGradeSelection = async (grade) => {
    try {
      await AsyncStorage.setItem('gradeLevel', grade); 
      navigation.navigate('Drawer', { grade }); 
    } catch (error) {
      console.error('Error saving grade level:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(13, 124, 102,0.5)' }]}>
      <View style={styles.iconsContainer}>
        <Image source={require('./../assets/logo1.png')} style={styles.logoStyle} />
        <Ionicons name="exit" size={32} color="black" onPress={() => navigation.goBack()} />
        <StatusBar style="auto" />
      </View>
      <View style={[styles.centerContainer, { marginTop: -45, gap: 10 }]}>
        <Text style={{ fontWeight: '600', marginBottom: -10 }}>you are?</Text>
        {['Elementary', 'High School'].map((grade) => (
          <TouchableOpacity
            key={grade}
            onPress={() => handleGradeSelection(grade)}
            style={[styles.learnButton, { backgroundColor: '#0D7C66', borderWidth: 1, borderColor: 'rgba(65,179,162,50)' }]}
          >
            <Text style={{ fontSize: 25, textAlign: 'center', color: 'white', fontWeight: '500' }}>
              {grade}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ImageBackground source={require('./../assets/kido_2nd_page-removebg-preview.png')} style={styles.bgImg}></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEEAD',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingHorizontal: '5%',
    alignItems: 'center',
    height: 200,
  },
  centerContainer: {
    padding: 10,
    alignItems: 'center',
  },
  logoStyle: {
    width: width * 0.2,
    height: height * 0.15,
    resizeMode: 'contain',
  },
  learnButton: {
    backgroundColor: '#8E1A1A',
    padding: 8,
    paddingHorizontal: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    width: width * 0.64,
    marginTop: 10,
  },
  bgImg: {
    flex: 1,
    width: width * 1.1,
    right: width * -0.04,
    zIndex: -1,
    height: height * 0.67,
    resizeMode: 'cover',
    position: 'absolute',
    bottom: -40,
  },
});

export default GradeLevelScreen;
