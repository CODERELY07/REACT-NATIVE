// AboutScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Ensure you have this library installed
import styles from '../styles/styles';
function AboutScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headText}>About Us</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.aboutText}>
          At Iconic Recipes, we believe cooking should be simple, fun, and
          accessible to everyone. Our app is designed to provide you with
          easy-to-follow recipes that you can whip up at home with minimal fuss.
          Whether you're a busy professional, a student, or someone who loves to
          cook but doesn’t have hours to spare, we’ve got you covered. From
          quick weeknight dinners to delicious desserts, all our recipes are
          carefully curated to ensure they are convenient to make using everyday
          ingredients. With step-by-step instructions, cooking tips, and a focus
          on flavor, Iconic Recipes is here to help you create memorable meals
          effortlessly. Cooking at home has never been this easy or enjoyable.
          Welcome to Iconic Recipes, where great food meets simplicity!
        </Text>
        <TouchableOpacity style={[styles.button, styles.signupButton]}>
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



export default AboutScreen;
