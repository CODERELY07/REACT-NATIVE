import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';

export default function ManagePlacesScreen() {
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [title, setTitle] = useState('');
  const [db, setDb] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null); 
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const initializeDB = async () => {
      const database = await SQLite.openDatabaseAsync('sorsogonExplorer');
      setDb(database);
      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS attractions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          path TEXT,
          title TEXT
        );
      `);
      fetchImages(database);
    };
    initializeDB();
  }, []);

  const fetchImages = async (database) => {
    const allRows = await database.getAllAsync('SELECT * FROM attractions');
    setImageList(allRows);
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!title || !image) {
      alert('Please provide necessary data!');
      return;
    }

    if (db) {
      const result = await db.runAsync(
        'INSERT INTO attractions (path, title) VALUES (?, ?)',
        [image, title]
      );
      console.log('Image uploaded, lastInsertRowId:', result.lastInsertRowId);

      fetchImages(db);
      setTitle('');
      setImage(null);
    }
  };

  const deleteImage = async (id) => {
    if (db) {
      await db.runAsync('DELETE FROM attractions WHERE id = ?', [id]);
      console.log('Deleted Successfully!');
      fetchImages(db);
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setNewTitle(item.title);
    setModalVisible(true);
  };

  const saveEdit = async () => {
    if (!newTitle.trim()) {
      alert('Title cannot be empty.');
      return;
    }

    if (db && editingItem) {
      await db.runAsync('UPDATE attractions SET title = ? WHERE id = ?', [
        newTitle,
        editingItem.id,
      ]);
      console.log('Title updated successfully!');
      
      fetchImages(db);
      setModalVisible(false); 
      setEditingItem(null); 
      setNewTitle(''); 
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.boxContainer,{ marginBottom: 10, alignItems: 'center' ,width:280 ,height:280, marginHorizontal:20}]}>
      <Image
        source={{ uri: item.path }}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
      <View style={{ alignItems: 'center' ,marginTop:-20}}>
        <Text style={{ fontWeight: 'bold', marginTop: 10 ,marginBottom:10}}>{item.title}</Text>
        <View style={{ flexDirection: 'row', marginTop: 5 ,gap:30}}>
          <TouchableOpacity
            onPress={() => openEditModal(item)}
            style={{ marginHorizontal: 10 }}
          >
            <Ionicons name="pencil" size={24} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteImage(item.id)}
            style={{ marginHorizontal: 10 }}
          >
            <Ionicons name="trash-bin" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ width: '80%' }}>
        <Text style={{ color: '#3C3D37', textAlign: 'center', marginVertical: 10 }}>
          Pick Image and add Place Name to upload new Attractions
        </Text>
        <TextInput
          style={styles.inputField}
          placeholder="Place Name"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={imagePicker}>
        <Text style={styles.buttonText}>Pick</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 30, fontSize: 18 }}>Attractions: </Text>
      <FlatList
        data={imageList}
        style={{ width: '100%', margin: 30, paddingLeft: 20 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Edit Title</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                width: '100%',
                marginBottom: 10,
              }}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Enter new title"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                onPress={saveEdit}
                style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}
              >
                <Text style={{ color: 'white' }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}
              >
                <Text style={{ color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

