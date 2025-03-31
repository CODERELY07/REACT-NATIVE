import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import backgroundImage from "./../assets/images/login.jpg";
  import externalStyles from "../style/externalStyle";
  
  export default function Screen3({ navigation, route }) {
    const { currentPage } = route.params; 

    const Link = () => {
      Linking.openURL('http://www.freepik.com');
    };
    const renderIndicators = () => {
        return [0, 1, 2].map((index) => (
            <View
            key={index}
            style={[
                externalStyles.circle,
                currentPage === index ? externalStyles.activeCircle : externalStyles.inactiveCircle,
            ]}
            />
        ));
    };

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 60, backgroundColor: '#fff' }}
        >
          <Ionicons name="chevron-back" size={38} color="#00A8E8" />
        </TouchableOpacity>
  
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <View style={styles.textBox}>
              <View style={styles.overlay} />
              <Text style={[externalStyles.title,{lineHeight:60}]}>
                Get Started
              </Text>
              <Text style={[externalStyles.description, externalStyles.para]}>
                Join Us Today! Sign up now to unlock exciting opportunities and create meaningful connections.
              </Text>
            </View>
      
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.button1}
              onPress={() => navigation.navigate('Signin')}
            >
              <Text style={[styles.buttonText, styles.buttonTextBlack]}>Sign In</Text>
            </TouchableOpacity>
            <Text style={[styles.text, externalStyles.link]}>
                Designed by{' '}
                <Text style={styles.link} onPress={Link}>
                  Freepik
                </Text>
            </Text>
            <Text style={styles.small}>
              Already have an account? click Login
              {"\n"}Doesn’t have an account yet? click Sign Up
            </Text>
          </View>
        </ImageBackground>
        <View style={[externalStyles.indicatorContainer, styles.renderStyle]}>
        {renderIndicators()}
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      paddingBottom: 100,
    },
    background: {
      marginTop:40,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    button: {
      position: 'absolute',
      bottom: 180,
      alignSelf: 'center',
      backgroundColor: '#00A8E8',
      padding: 10,
      borderRadius: 5,
      width: '80%',
      alignItems: 'center',
    },
    button1: {
      position: 'absolute',
      bottom: 126,
      alignSelf: 'center',
      backgroundColor: '#E7ECEF',
      padding: 10,
      borderRadius: 5,
      width: '80%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: "bold",
    },
    buttonTextBlack: {
      color: '#000',
    },
    small: {
      textAlign: 'center',
      position: 'absolute',
      bottom: 40,
      color: '#515252',
      fontSize: 12,
      lineHeight: 20,
      width: '100%',
      backgroundColor: 'transparent',
    },
    textBox: {
     top:-50,
      zIndex: 100,
      width: '80%',
      alignItems: 'center',
      position: 'absolute',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderRadius: 5,
      zIndex: -1,
    },
    renderStyle: {
        position:'absolute',
        bottom:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        backgroundColor:'transparent',
    }
  });
  