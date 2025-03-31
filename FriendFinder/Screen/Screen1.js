import { Image, StyleSheet, Text, View, TouchableOpacity,Linking } from 'react-native';
import React, { useState , useEffect} from 'react';
import externalStyles from "../style/externalStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Screen1({ navigation}) {
  const [currentPage, setCurrentPage] = useState(0);

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
  const handleContinue = () => {
    setCurrentPage(0); 
    navigation.navigate('Screen2', { currentPage: 1 }); 
  };
 // Check if the user is already logged in
 useEffect(() => {
  const checkLoginStatus = async () => {
    const userEmail = await AsyncStorage.getItem("userEmail");
    if (userEmail) {
      navigation.navigate("Main"); // Redirect to HomeStack if logged in
    }
  };
  checkLoginStatus();
}, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={externalStyles.title}>Welcome{"\n"}FriendFinder</Text>
      <View style={externalStyles.imageContainer}>
        <Image style={externalStyles.img} source={require('./../assets/images/first.jpg')} />
        <Text style={[styles.text, externalStyles.link]}>
          Designed by{' '}
          <Text style={styles.link} onPress={Link}>
            Freepik
          </Text>
        </Text>
      </View>
      <Text style={[externalStyles.description, externalStyles.big]}>
        <Text style={externalStyles.highlight}>Experience </Text>
        a fresh approach to 
        <Text style={externalStyles.highlight}> friendship!</Text>
      </Text>
      <Text style={[externalStyles.description, externalStyles.para]}>
        Our app unites you with like-minded individuals in all over the world, making meaningful connections effortless.
      </Text>
      <TouchableOpacity style={externalStyles.button} onPress={handleContinue}>
        <Text style={externalStyles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={externalStyles.indicatorContainer}>
        {renderIndicators()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  }
});
