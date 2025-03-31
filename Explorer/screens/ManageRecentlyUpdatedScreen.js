import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { View, Text, TextInput, Button,Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function ManageRecentlyUpdatedScreen() {
  const [db, setDb] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  
  useEffect(() => {
    const initializeDB = async () => {
      const database = await SQLite.openDatabaseAsync('sorsogonExplorer');
      setDb(database);
      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS recent_updates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          description TEXT
        );
      `);
      fetchUpdates(database);
    };
    initializeDB();
  }, []);

  const deleteUpdates = async (id) =>{
    try{
      const db = await SQLite.openDatabaseAsync('sorsogonExplorer');
      await db.runAsync('DELETE FROM recent_updates WHERE id = ?', [id]);
      console.log("Delete successfully!");
    }catch(e){
      console.log("Error: ", e);
    }
  }
  
  const fetchUpdates = async (database) => {
    const result = await database.getAllAsync('SELECT * FROM recent_updates');
    setUpdates(result);
  };

  const handleAddUpdate = async () => {
    if (updateTitle && updateDescription) {
      try {

      await db.execAsync(`
        INSERT INTO recent_updates (title, description) 
        VALUES ('${updateTitle}', '${updateDescription}');
      `);
      fetchUpdates(db); 
      setUpdateTitle('');
      setUpdateDescription('');
    } catch (e) {
      console.log("Error adding update:", e);
    }
    } else {
      alert('Please provide both title and description');
    }
  };

  return (
    <View style={[styles.container, {paddingHorizontal:20}]}>
      <Text style={styles.headerText}>Manage Recently Updated</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Update Title"
        value={updateTitle}
        onChangeText={setUpdateTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Update Description"
        value={updateDescription}
        onChangeText={setUpdateDescription}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleAddUpdate}>
        <Text style={styles.loginButtonText}>Add Update</Text>
      </TouchableOpacity>
    
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.updatesList}>
        {updates.length > 0 ? (
          updates.map((update) => (
            <View key={update.id} style={[styles.updateItem]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.updateTitle}>{update.title}</Text>
                <Text style={styles.updateDescription}>{update.description}</Text>
              </View>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Confirm Delete",
                  "Are you sure you want to delete this update?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: async () => {
                        await deleteUpdates(update.id); 
                        fetchUpdates(db); 
                      },
                    },
                  ]
                );
              }}
              style={[styles.deleteButton, {marginLeft:260,marginTop:-50,paddingVertical:10}]}
            >
               <Ionicons name="trash-bin" size={24} color="red" />
            </TouchableOpacity>

                  </View>
                ))
              ) : (
                <Text>No recent updates available.</Text>
              )}
      </ScrollView>


    </View>
  );
}
