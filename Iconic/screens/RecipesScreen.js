// RecipesScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Ensure you have this library installed
import styles from "../styles/styles";

function RecipesScreen({ navigation }) {
  const [showDescriptions, setShowDescriptions] = useState({
    breakfast: false,
    lunch: false,
    snacks: false,
    dinner: false,
    desserts: false,
    beverage: false,
  });

  const toggleDescription = (categ) => {
    setShowDescriptions((prev) => ({
      ...prev,
      [categ]: !prev[categ],
    }));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headText}>Recipes</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => toggleDescription("breakfast")}>
          <Text style={styles.recipeTitle}>● Breakfast ▼</Text>
        </TouchableOpacity>
        {showDescriptions.breakfast && (
          <Text style={styles.recipeDescription}>▢ Lumpiang Shanghai</Text>
        )}
      </View>
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => toggleDescription("lunch")}>
          <Text style={styles.recipeTitle}>● Lunch ▼</Text>
        </TouchableOpacity>
        {showDescriptions.lunch && (
          <Text style={styles.recipeDescription}>
            ▢ Menudo {"\n"}▢ Beef Sinigang {"\n"}▢ Pork Adobo {"\n"}
          </Text>
        )}
      </View>
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => toggleDescription("snacks")}>
          <Text style={styles.recipeTitle}>● Snacks ▼</Text>
        </TouchableOpacity>
        {showDescriptions.snacks && (
          <Text style={styles.recipeDescription}>▢ Special Lomi {"\n"}</Text>
        )}
      </View>
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => toggleDescription("dinner")}>
          <Text style={styles.recipeTitle}>● Dinner ▼</Text>
        </TouchableOpacity>
        {showDescriptions.dinner && (
          <Text style={styles.recipeDescription}>▢ Sinigang {"\n"}</Text>
        )}
      </View>
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => toggleDescription("desserts")}>
          <Text style={styles.recipeTitle}>● Desserts ▼</Text>
        </TouchableOpacity>
        {showDescriptions.desserts && (
          <Text style={styles.recipeDescription}>▢ Leche Flan {"\n"}</Text>
        )}
      </View>
      <View style={styles.recipe}>
        <TouchableOpacity onPress={() => toggleDescription("beverage")}>
          <Text style={styles.recipeTitle}>● Beverage ▼</Text>
        </TouchableOpacity>
        {showDescriptions.beverage && (
          <Text style={styles.recipeDescription}>
            ▢ Strawberry Lemonade {"\n"}▢ Blackberry Margarita {"\n"}▢ Pineapple
            Fruit Cocktail {"\n"}▢ Frozen Limoncello {"\n"}
          </Text>
        )}
      </View>
    </View>
  );
}

export default RecipesScreen;
