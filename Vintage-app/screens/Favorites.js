import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import * as SQLite from "expo-sqlite";
import { styles } from "../styles/styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = () => {
  const [favoritesList, setFavoritesList] = useState([]);
  const [userID, setUserID] = useState('');

  const getUserID = async () => {
    try {
      const value = await AsyncStorage.getItem("userID");
      if (value !== null) {
        setUserID(value);
        console.log("User ID: ", value);
      }
    } catch (e) {
      console.log("Error fetching userID: ", e);
    }
  };

  useEffect(() => {
    getUserID();
  }, []);

  useEffect(() => {
    if (userID) {
      fetchFavorites();
    }
  }, [userID]);

  const fetchFavorites = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("myApp");
  
      const favoritesQuery = `
        SELECT images.*, 
               COUNT(user_favorites.imageId) AS favoriteCount, 
               1 AS isFavorite
        FROM images
        INNER JOIN user_favorites ON images.id = user_favorites.imageId
        WHERE user_favorites.userId = ?
        GROUP BY images.id;
      `;
  
      const favorites = await db.getAllAsync(favoritesQuery, [userID]);
      setFavoritesList(favorites);
    } catch (error) {
      console.error("Error fetching favorites: ", error);
    }
  };
  

  const toggleFavorite = async (imageId) => {
    try {
      const db = await SQLite.openDatabaseAsync("myApp");

      const checkFavoriteQuery = `
        SELECT * 
        FROM user_favorites 
        WHERE userId = ? AND imageId = ?;
      `;

      const isFavorited = await db.getFirstAsync(checkFavoriteQuery, [userID, imageId]);

      if (isFavorited) {

        await db.runAsync(
          "DELETE FROM user_favorites WHERE userId = ? AND imageId = ?;",
          [userID, imageId]
        );
        await db.runAsync(
          "UPDATE images SET favoriteCount = favoriteCount - 1 WHERE id = ?;",
          [imageId]
        );
      } else {

        await db.runAsync(
          "INSERT INTO user_favorites (userId, imageId) VALUES (?, ?);",
          [userID, imageId]
        );
        await db.runAsync(
          "UPDATE images SET favoriteCount = favoriteCount + 1 WHERE id = ?;",
          [imageId]
        );
      }

      fetchFavorites();
    } catch (error) {
      console.error("Error toggling favorite: ", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.scrollContainer}>
        <Image
          source={{ uri: item.path }}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={{ textAlign: "center" }}>{item.description}</Text>

        <View>
          <TouchableOpacity
            style={{ marginLeft: 240, marginTop: -30 }}
            onPress={() => toggleFavorite(item.id)}
          >
            <AntDesign
              name={item.isFavorite ? "heart" : "hearto"}
              size={24}
              color="red"
            />
          </TouchableOpacity>
        
        </View>
      </View>
    );
  };

  return (
    <View style={styles.homeContainer}>
      <Text style={[styles.heading, { marginTop: 50 }]}>Your Favorite Vintage</Text>

      {favoritesList.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favoritesList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={{ marginTop: 80, textAlign: 'center', fontSize: 20, color: "#9AA6B2" }}>
          No Favorite Item in the List
        </Text>
      )}
    </View>
  );
};

export default Favorites;
