import React from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet } from 'react-native';

function LessonScreen({ route }) {
  const { topic } = route.params; 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{topic.title}</Text>
        <Text style={styles.description}>{topic.lesson}</Text>
        <Text style={styles.lessonContent}>
          {topic.lesson_content} 
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 15,
    color: '#555',
  },
  lessonContent: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
});

export default LessonScreen;
