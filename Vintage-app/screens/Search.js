import { View, Text, TextInput, Button, TouchableOpacity, Modal, Image, ScrollView, FlatList } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from '../styles/styles';
import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [userID, setUserID] = useState('');
    
    const getUserID = async () => {
        try {
            const value = await AsyncStorage.getItem('userID');
            if (value !== null) {
                setUserID(value); 
                console.log(value); 
            }
        } catch (e) {
            console.log("Error fetching userID: ", e);
        }
    };
    
      
    useEffect(() => {
        const initializeDB = async () => {
            const db = await SQLite.openDatabaseAsync('myApp');
           
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS images (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    path TEXT,
                    title TEXT,
                    description TEXT,
                    isFavorite INTEGER DEFAULT 0,
                    userId TEXT,
                    favoriteCount INTEGER DEFAULT 0
                );
            `);
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS user_favorites (
                  userId TEXT,
                  imageId INTEGER,
                  PRIMARY KEY (userId, imageId)
                );
              `);
              
            fetchImages();
        };
        initializeDB();
        getUserID();
    }, []);

    const fetchImages = async () => {
        const db = await SQLite.openDatabaseAsync('myApp');
        const allRows = await db.getAllAsync('SELECT * FROM images');
        setImageList(allRows);
        setFilteredImages(allRows); 
    };
    
    

    const toggleFavorite = async (imageId, userId) => {
        const db = await SQLite.openDatabaseAsync("myApp");

        const result = await db.getAllAsync(
            "SELECT * FROM user_favorites WHERE userId = ? AND imageId = ?",
            [userId, imageId]
        );
        const isFavorited = result.length > 0; 
    
        if (isFavorited) {
            await db.runAsync("DELETE FROM user_favorites WHERE userId = ? AND imageId = ?", [userId, imageId]);
            await db.runAsync(
                "UPDATE images SET favoriteCount = favoriteCount - 1 WHERE id = ?",
                [imageId]
            );
        } else {
            await db.runAsync(
                "INSERT INTO user_favorites (userId, imageId) VALUES (?, ?)",
                [userId, imageId]
            );
            await db.runAsync(
                "UPDATE images SET favoriteCount = favoriteCount + 1 WHERE id = ?",
                [imageId]
            );
        }

        fetchImages();
    };
    
    
      
    


    useEffect(() => {
        const results = imageList.filter(image =>
            image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            image.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredImages(results);
    }, [searchQuery, imageList]);

    const renderItem = ({ item }) => {
        const isFavorite = item.favoriteCount > 0;
    
        return (
            <View style={styles.scrollContainer}>
                <TouchableOpacity
                    onPress={() => openModal(item.path)}
                    style={styles.itemContainer}
                >
                    <Image source={{ uri: item.path }} style={styles.itemImage}
                        resizeMode="contain" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <Text style={{ textAlign: 'center' }}>{item.description}</Text>

                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(item.id, userID)} 
                    >
                        <AntDesign
                            name={isFavorite ? "heart" : "hearto"}
                            size={24}
                            color="red"
                        />
                    </TouchableOpacity>

                    <Text style={[styles.favoriteCountText, {marginTop:-24,marginLeft:230,zIndex:-99}]}>
                        {item.favoriteCount} 
                    </Text>
                </View>
            </View>
        );
    };
    
    

    const openModal = (imageUri) => {
        setSelectedImage(imageUri);
        setModalVisible(true);
    };
    

    return (
        <View style={styles.homeContainer}>
            <View style={styles.searchBar}>
                <View style={styles.searchRow}>
                    <AntDesign name="search1" size={24} color="rgba(0,0,0,.5)" />
                    <TextInput
                        placeholder="Search..."
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)} // Update search query
                    />
                </View>
            </View>
            <Text style={styles.heading}>Find YOUR VINTAGE</Text>
           {filteredImages.length  ? (<FlatList
                showsVerticalScrollIndicator={false}
                data={filteredImages} // Render filtered images
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />): (
                  <Text style={{marginTop:80,textAlign:'center',fontSize:20,color:"#9AA6B2"}}>Sorry, Can't Search your Item!</Text>
                )}
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.modalImage}
                        resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => navigation.navigate("Favorites")}
            >
            </TouchableOpacity>
        </View>
    );
};

export default Search;
