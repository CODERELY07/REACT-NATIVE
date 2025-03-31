// ContactScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Ensure you have this library installed
import { FontAwesome6, Ionicons } from '@expo/vector-icons'; // Ensure you have these libraries installed
import styles from '../styles/styles';
function ContactScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headText}>Contact Us</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.contactBody}>
          <View style={styles.contactContent}>
            <FontAwesome6 name="location-dot" size={24} color="#821131" />
            <Text style={styles.contactText}>
              Nabua Camarinis Sur, Philippines
            </Text>
          </View>
          <View style={styles.contactContent}>
            <FontAwesome6 name="phone" size={24} color="#821131" />
            <Text style={styles.contactText}>091234543222</Text>
          </View>
          <View style={styles.contactContent}>
            <Ionicons name="mail" size={24} color="#821131" />
            <Text style={styles.contactText}>ionicrecipes@email.com</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ContactScreen;
