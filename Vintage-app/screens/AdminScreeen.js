import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.clear();

    navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
    });
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
      fetchImages(); 
    };
    initializeDB();
  }, []);


  const fetchImages = async () => {
    const db = await SQLite.openDatabaseAsync('myApp'); 
    const allRows = await db.getAllAsync('SELECT * FROM images');
    setImageList(allRows);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!title || !description || !image) {
      alert('Please provide a title, description, and pick an image.');
      return;
    }

    const db = await SQLite.openDatabaseAsync('myApp'); 
    const result = await db.runAsync(
      'INSERT INTO images (path, title, description) VALUES (?, ?, ?)', 
      [image, title, description]
    );
    console.log('Image uploaded, lastInsertRowId:', result.lastInsertRowId);
    
    fetchImages(); 
    setTitle(''); 
    setDescription('');
    setImage(null);
  };

  const deleteImage = async (id) => {
    const db = await SQLite.openDatabaseAsync('myApp'); 
    await db.runAsync('DELETE FROM images WHERE id = ?',[id]);
    console.log("Delete Successfully!");
    fetchImages();
  }

  
  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10, width:'100%',alignItems:'center', }}>
      <Image source={{ uri: item.path }} style={{ width: 250, height: 250 }}  resizeMode="contain"/>
      <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{item.title}</Text>
      <Text>{item.description}</Text>
      <TouchableOpacity onPress={() => deleteImage(item.id)}>
        <Text style={{ color: 'red', marginTop: 5 }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}onPress={pickImage} >
        <Text style={styles.textColor}>Pick an image from camera roll</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={uploadImage} >
        <Text style={styles.textColor}>Upload Image</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 30, fontSize: 18 }}>Uploaded Images:</Text>
      <FlatList
        data={imageList}
        style={{width:'100%'}}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop:150
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  button:{
    backgroundColor:'#FF6B6B',
    padding:10,
    marginTop:20,
  },
  textColor:{
    color:'#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
});
