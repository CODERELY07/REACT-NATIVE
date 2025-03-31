

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from "../styles/styles";

const ImageScrollSection = ({ title, images, descriptions, recipes, navigation }) => {
  return (
    <View style={styles.imageContainer}>
      <Text style={styles.imageTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("ImageDetail", {
                title: title,
                image,
                description: descriptions[index],
                recipes: recipes[index],
              })
            }
          >
            <Image source={image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ImageScrollSection;
