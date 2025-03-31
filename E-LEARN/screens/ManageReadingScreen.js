import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export default function ManageReadingsScreen() {
  const [readingsList, setReadingsList] = useState([]);
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [lesson, setLesson] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [editingReadingId, setEditingReadingId] = useState(null);
  const [editSubject, setEditSubject] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editLesson, setEditLesson] = useState('');
  const [editShortDescription, setEditShortDescription] = useState('');
  const [editGradeLevel, setEditGradeLevel] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await SQLite.openDatabaseAsync('Elearn');
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT NOT NULL,
            title TEXT NOT NULL,
            lesson TEXT NOT NULL,
            short_description TEXT,
            gradeLevel TEXT
          );
        `);
      } catch (e) {
        console.log(e);
      }
    };

    initDB();
    fetchReadings();
  }, []);

  const fetchReadings = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('Elearn');
      const result = await db.getAllAsync('SELECT * FROM readings');
      setReadingsList(result);
    } catch (e) {
      console.log(e);
    }
  };

  const saveReading = async () => {
    if (!subject || !title || !lesson || !shortDescription || !gradeLevel) {
      alert('Please provide all fields.');
      return;
    }

    try {
      const db = await SQLite.openDatabaseAsync('Elearn');
      await db.runAsync(
        'INSERT INTO readings (subject, title, lesson, short_description, gradeLevel) VALUES (?, ?, ?, ?, ?)',
        [subject, title, lesson, shortDescription, gradeLevel]
      );
      fetchReadings(); 
      clearInputs(); 
    } catch (e) {
      console.log(e);
    }
  };

  const deleteReading = async (id) => {
    try {
      const db = await SQLite.openDatabaseAsync('Elearn');
      await db.runAsync('DELETE FROM readings WHERE id = ?', [id]);
      fetchReadings();
    } catch (e) {
      console.log(e);
    }
  };

  const editReading = async (id) => {
    try {
      const db = await SQLite.openDatabaseAsync('Elearn');
      await db.runAsync(
        'UPDATE readings SET subject = ?, title = ?, lesson = ?, short_description = ?, gradeLevel = ? WHERE id = ?',
        [editSubject, editTitle, editLesson, editShortDescription, editGradeLevel, id]
      );
      fetchReadings();
      setModalVisible(false);
      clearEditInputs();
    } catch (e) {
      console.log(e);
    }
  };

  const clearInputs = () => {
    setSubject('');
    setTitle('');
    setLesson('');
    setShortDescription('');
    setGradeLevel('');
  };

  const clearEditInputs = () => {
    setEditSubject('');
    setEditTitle('');
    setEditLesson('');
    setEditShortDescription('');
    setEditGradeLevel('');
  };

  const renderItem = ({ item }) => (
    <View style={[styles.readingItem, {height:300,marginTop:60}]}>
      <ScrollView style={{marginBottom:20}} showsVerticalScrollIndicator={false}>
        <Text style={styles.readingDetails}>
          <Text style={styles.boldText}>Subject:</Text> {item.subject}
        </Text>
        <Text style={styles.readingDetails}>
          <Text style={styles.boldText}>Title:</Text> {item.title}
        </Text>
        <Text style={styles.readingDetails}>
          <Text style={styles.boldText}>Lesson:</Text> {item.lesson}
        </Text>
        <Text style={styles.readingDetails}>
          <Text style={styles.boldText}>Description:</Text> {item.short_description}
        </Text>
        <Text style={styles.readingDetails}>
          <Text style={styles.boldText}>Grade Level:</Text> {item.gradeLevel}
        </Text>
       
      </ScrollView>
      <Button color="#8E1A1A" title="Edit" onPress={() => {
          setEditingReadingId(item.id);
          setEditSubject(item.subject);
          setEditTitle(item.title);
          setEditLesson(item.lesson);
          setEditShortDescription(item.short_description);
          setEditGradeLevel(item.gradeLevel);
          setModalVisible(true);
        }} />
      <Button title="Delete" color="#8E1A1A" onPress={() => deleteReading(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Manage Readings</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={{height:200}}>
       
        <TextInput
          style={[styles.input, { height: 100, marginBottom:30}]} 
          placeholder="Enter Subject"
          value={subject}
          onChangeText={setSubject}
          multiline={true}
        />
        <TextInput
          style={[styles.input, { height: 100, marginBottom:30}]} 
          placeholder="Enter Title"
          value={title}
          onChangeText={setTitle}
          multiline={true}
        />
        <TextInput
          style={[styles.input, { height: 100, marginBottom:30}]} 
          placeholder="Enter Lesson"
          value={lesson}
          onChangeText={setLesson}
          multiline={true}
        />
        <TextInput
          style={[styles.input, { height: 100, marginBottom:30}]} 
          placeholder="Enter Short Description"
          value={shortDescription}
          onChangeText={setShortDescription}
          multiline={true}
        />
        <TextInput
          style={[styles.input, { height: 100, marginBottom:30}]} 
          placeholder="Enter Grade Level"
          value={gradeLevel}
          onChangeText={setGradeLevel}
          multiline={true}
        />
      </ScrollView>

      <Button color="#8E1A1A" title="Save Reading" onPress={saveReading} />
   
      <FlatList
        showsVerticalScrollIndicator={false}
        data={readingsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
           style={[styles.input, {width:300, height: 100 }]} 
           multiline={true}
            placeholder="Edit Subject"
            value={editSubject}
            onChangeText={setEditSubject}
          />
          <TextInput
            style={[styles.input, {width:300, height: 100 }]} 
            multiline={true}
            placeholder="Edit Title"
            value={editTitle}
            onChangeText={setEditTitle}
          />
          <TextInput
            style={[styles.input, {width:300, height: 100 }]} 
            multiline={true}
            placeholder="Edit Lesson"
            value={editLesson}
            onChangeText={setEditLesson}
          />
          <TextInput
            style={[styles.input, {width:300, height: 100 }]} 
            multiline={true}
            placeholder="Edit Short Description"
            value={editShortDescription}
            onChangeText={setEditShortDescription}
          />
          <TextInput
            style={[styles.input, {width:300, height: 100 }]} 
            multiline={true}
            placeholder="Edit Grade Level"
            value={editGradeLevel}
            onChangeText={setEditGradeLevel}
          />
          </ScrollView>
          <Button color="#8E1A1A" title="Save Changes" onPress={() => editReading(editingReadingId)} />
            <Text></Text>
          <Button color="#8E1A1A" title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: '#8E1A1A',
  },
  input: {
    borderWidth: 1,
    width:'100%',
    borderColor: '#8E1A1A',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  readingItem: {
    marginTop: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  readingDetails: {
    marginTop: 5,
    fontSize: 16,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
});
