import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import externalStyles from "../style/externalStyle";

export default function Screen2({ navigation, route }) {
  const { currentPage } = route.params; 

  const Link = () => {
    Linking.openURL('http://www.freepik.com');
  };

  const handleContinue = () => {
    navigation.navigate('Screen3', { currentPage: currentPage + 1 }); 
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
    <View style={styles.container}>
      <View style={{ marginTop: 60 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginBottom: 20 }}
        >
          <Ionicons name="chevron-back" size={38} color="#00A8E8" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff", padding: 30 }}>
        <Text style={externalStyles.title}>Why Connect?</Text>
        <View style={externalStyles.imageContainer}>
          <Image style={externalStyles.img} source={require('./../assets/images/second.jpg')} />
          <Text style={[styles.text, externalStyles.link]}>
          Designed by{' '}
          <Text style={styles.link} onPress={Link}>
            Freepik
          </Text>
        </Text>
        </View>
        <Text style={[externalStyles.description, externalStyles.para]}>
        Expand your global network! Explore different cultures with, FriendFinder connects you with people from around the world, allowing you to chat, learn, and share experiences with others across the globe.
        </Text>
        <TouchableOpacity style={externalStyles.button} onPress={handleContinue}>
          <Text style={externalStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={externalStyles.indicatorContainer}>
        {renderIndicators()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: 'center',
    backgroundColor: "#fff",
  }
});
