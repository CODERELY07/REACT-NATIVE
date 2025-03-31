import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from '../styles/styles';


function FirstScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <Image source={require('./../assets/logo1.png')} style={styles.logoStyle} />
        <AntDesign name="questioncircle" size={32} color="black" />
        <StatusBar style="auto" />
      </View>
      <View style={styles.centerContainer}>
        <Text style={{ fontWeight: 900, fontSize: 24 }}>Click</Text>
        <Text style={{ fontWeight: 900, fontSize: 24 }}>to</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('GradeLevel'); }} style={styles.learnButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ width: 50, height: 50 }} source={require('./../assets/bulb-removebg.png')} />
            <Text style={{ fontSize: 32, textAlign: 'center', color: 'white', fontWeight: 900 }}>
              LEARN
            </Text>
            <Image style={{ width: 50, height: 50 }} source={require('./../assets/bulb-removebg.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => { navigation.navigate('LoginScreen'); }} style={styles.learnButton} >
          <Text style={{ fontSize: 32, textAlign: 'center', color: 'white', fontWeight: 900 ,paddingVertical:5}}>Manage</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground source={require('./../assets/kido.png')} style={styles.bgImg}></ImageBackground>
    </View>
  );
}



export default FirstScreen;
