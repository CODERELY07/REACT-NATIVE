import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import * as SQLite from 'expo-sqlite'; 

export default function ManageVideos() {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [title, setTitle] = useState(''); 
  const [uploader, setUploader] = useState(''); 
  const [gradeLevel, setGradeLevel] = useState(''); 
  const [mediaList, setMediaList] = useState([]);
  const [editingMediaId, setEditingMediaId] = useState(null); 
  const [editTitle, setEditTitle] = useState('');
  const [editUploader, setEditUploader] = useState(''); 
  const [editGradeLevel, setEditGradeLevel] = useState(''); 

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await SQLite.openDatabaseAsync('Elearn');
  
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS media (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uri TEXT NOT NULL,
            type TEXT NOT NULL,
            title TEXT,
            uploader TEXT,
            gradeLevel TEXT, 
            views INTEGER DEFAULT 0
          );
        `);
      } catch (e) {
        console.log(e);
      }
    };

    initDB();
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('Elearn');
      const result = await db.getAllAsync('SELECT * FROM media');
      setMediaList(result);
    } catch (e) {
      console.log(e);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType(result.assets[0].type);
    }
  };

  const saveMedia = async () => {
    if (!title || !uploader || !gradeLevel) {
      alert('Please provide a title, uploader name, and grade level.');
      return;
    }

    try {
      const db = await SQLite.openDatabaseAsync('Elearn');
      await db.runAsync(
        'INSERT INTO media (uri, type, title, uploader, gradeLevel, views) VALUES (?, ?, ?, ?, ?, ?)',
        [media, mediaType, title, uploader, gradeLevel, 0] 
      );
      fetchMedia(); 
      setMedia(null);
      setTitle('');
      setUploader('');
      setGradeLevel('');
    } catch (e) {
      console.log(e);
    }
  };

  const deleteMedia = async (id) => {
    try {
      const db = await SQLite.openDatabaseAsync('Elearn');
      await db.runAsync('DELETE FROM media WHERE id = ?', [id]);
      fetchMedia();
    } catch (e) {
      console.log(e);
    }
  };

  const editMedia = async (id) => {
    try {
      const db = await SQLite.openDatabaseAsync('Elearn');
      await db.runAsync(
        'UPDATE media SET title = ?, uploader = ?, gradeLevel = ? WHERE id = ?',
        [editTitle, editUploader, editGradeLevel, id]
      );
      fetchMedia();
      setEditingMediaId(null); 
      setEditTitle('');
      setEditUploader('');
      setEditGradeLevel('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Upload New Video </Text>
      </View>

      <Button title="Pick a video to upload" onPress={pickImage} color="#8E1A1A" />

      {media && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter video title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter uploader name"
            value={uploader}
            onChangeText={setUploader}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter grade level"
            value={gradeLevel}
            onChangeText={setGradeLevel}
          />
          <Button title="Save Media" onPress={saveMedia} color="#8E1A1A" />
        </View>
      )}

      <Text style={styles.mediaListTitle}>Saved Media:</Text>
      {mediaList.map((item) => (
        <View key={item.id} style={styles.mediaItem}>
          {editingMediaId === item.id ? (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Edit Title"
                value={editTitle}
                onChangeText={setEditTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Edit Uploader"
                value={editUploader}
                onChangeText={setEditUploader}
              />
              <TextInput
                style={styles.input}
                placeholder="Edit Grade Level"
                value={editGradeLevel}
                onChangeText={setEditGradeLevel}
              />
              <Button
                title="Save Changes"
                onPress={() => editMedia(item.id)}
                color="#8E1A1A"
              />
              <Button
                title="Cancel"
                onPress={() => setEditingMediaId(null)}
                color="#F44336"
              />
            </View>
          ) : (
            <>
              <Text style={styles.mediaDetails}>
                <Text style={styles.boldText}>Title:</Text> {item.title || 'Untitled'}
              </Text>
              <Text style={styles.mediaDetails}>
                <Text style={styles.boldText}>Uploader:</Text> {item.uploader || 'Unknown'}
              </Text>
              <Text style={styles.mediaDetails}>
                <Text style={styles.boldText}>Grade Level:</Text> {item.gradeLevel || 'N/A'}
              </Text>
              <Text style={styles.mediaDetails}>
                <Text style={styles.boldText}>Views:</Text> {item.views}
              </Text>
              {item.type === 'image' ? (
                <Image source={{ uri: item.uri }} style={styles.media} />
              ) : (
                <Video
                  source={{ uri: item.uri }}
                  style={styles.media}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                />
              )}
              <Button
                title="Edit"
                onPress={() => {
                  setEditingMediaId(item.id);
                  setEditTitle(item.title);
                  setEditUploader(item.uploader);
                  setEditGradeLevel(item.gradeLevel); 
                }}
                color="#8E1A1A"
                style={styles.actionButton}
              />
              <Button
                title="Delete"
                onPress={() => deleteMedia(item.id)}
                color="#F44336"
                style={styles.actionButton}
              />
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8E1A1A',
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#8E1A1A',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  media: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  mediaListTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mediaItem: {
    marginTop: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  mediaDetails: {
    marginTop: 5,
    fontSize: 16,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  actionButton: {
    marginTop: 10,
  },
});
