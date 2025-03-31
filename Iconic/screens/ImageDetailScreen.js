// ImageDetailScreen.js
import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from '../styles/styles';

const ImageDetailScreen = ({ route, navigation }) => {
  const { title, image, description, recipes } = route.params;

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.header, { marginTop: -30 }]}>
        <Text style={[styles.headText, { fontSize: 20 }]}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.imageMain}>
        <Image source={image} style={styles.image} />
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={{ marginTop: 30 }}></View>
      <Text style={styles.recipeTitle}>Recipe:</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.recipes}>
          <Text style={styles.recipeText}>{recipes}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ImageDetailScreen;
