import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const CommentsScreen = () => {
  const route = useRoute();
  const { postID, userID } = route.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postUsername, setPostUsername] = useState('');

  // Fetch post username
  const fetchPostUsername = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('friendfinder');
      const result = await db.getAllAsync(
        'SELECT user.Username as username FROM post JOIN user ON post.UserID = user.UserID WHERE post.PostID = ?',
        [postID]
      );
      const username = result.length > 0 ? result[0].username : '';
      setPostUsername(username);
    } catch (e) {
      console.log('Error fetching post username:', e);
    }
  };

  // Fetch comments for the post
  const fetchComments = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('friendfinder');
      const result = await db.getAllAsync(
        `
          SELECT comment.CommentID, comment.Content as CommentContent, user.Username, comment.UserID as CommentUserID
          FROM comment
          JOIN user ON comment.UserID = user.UserID
          WHERE comment.PostID = ?`,
        [postID]
      );

      const comments = result.map((item) => ({
        CommentID: item.CommentID,
        Content: item.CommentContent,
        Username: item.Username,
        CommentUserID: item.CommentUserID,
      }));

      setComments(comments);

      // If the postContent is empty, fetch it separately
      if (result.length > 0) {
        setPostContent(result[0].PostContent || ''); // Set post content
      }
    } catch (e) {
      console.log('Error fetching comments:', e);
    }
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      Alert.alert('Error', 'Comment cannot be empty');
      return;
    }

    try {
      const db = await SQLite.openDatabaseAsync('friendfinder');
      await db.runAsync('INSERT INTO comment (PostID, UserID, Content) VALUES (?, ?, ?)', [
        postID,
        userID,
        newComment,
      ]);
      setNewComment('');
      fetchComments(); // Refresh the comments list
    } catch (e) {
      console.log('Error adding comment:', e);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentID) => {
    try {
      const db = await SQLite.openDatabaseAsync('friendfinder');
      await db.runAsync('DELETE FROM comment WHERE CommentID = ?', [commentID]);
      fetchComments(); // Refresh the comments list
    } catch (e) {
      console.log('Error deleting comment:', e);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchPostUsername();
  }, [postID]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={comments}
        keyExtractor={(item) => item.CommentID.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentUsername}>{item.Username}</Text>
              {item.CommentUserID === userID && (
                <TouchableOpacity onPress={() => handleDeleteComment(item.CommentID)}>
                  <AntDesign name="delete" size={20} color="red" />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.commentContent}>{item.Content}</Text>
          </View>
        )}
      />

      {/* Add Comment Section */}
      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
          <Text style={styles.addButtonText}>Add Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 15,
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postUsername: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  postContent: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  commentContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentUsername: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  commentContent: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  addCommentContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#00A8E8',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommentsScreen;
