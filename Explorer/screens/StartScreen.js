import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

function StartScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./../assets/Paguriran.jpg')} resizeMode='cover' style={styles.startContainer}>
        <View style={styles.overlay} />
        <View style={styles.overlayContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>
              <Text style={styles.big}>S</Text>orsogon <Text style={styles.big}>E</Text>xplorer
            </Text>
            <Text style={styles.subText}>Discover the best of Sorsogon.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Explore Now</Text>
              <AntDesign name="arrowright" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default StartScreen;
