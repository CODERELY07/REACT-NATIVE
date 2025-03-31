import * as React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import externalStyles from "../style/externalStyle";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

// Fetch posts based on the logged-in user
const fetchUserPosts = async (userID) => {
  try {
    const db = await SQLite.openDatabaseAsync("friendfinder");
    const posts = await db.getAllAsync(
      "SELECT post.PostID, post.Content, user.Username, post.UserID, " +
      " (SELECT COUNT(*) FROM `like` WHERE PostID = post.PostID) AS LikeCount " +
      " FROM post JOIN user ON post.UserID = user.UserID WHERE post.UserID = ?",
      [userID]
    );
    return posts;
  } catch (e) {
    console.log("Error fetching posts:", e);
    return [];
  }
};

// Handle like and comment actions for the user's posts
const handleLikePost = async (postID, userID, setLikedPosts, setPostLikes) => {
  try {
    const db = await SQLite.openDatabaseAsync("friendfinder");

    const existingLike = await db.getFirstAsync(
      "SELECT * FROM `like` WHERE PostID = ? AND UserID = ?",
      [postID, userID]
    );

    if (existingLike) {
      await db.runAsync("DELETE FROM `like` WHERE PostID = ? AND UserID = ?", [
        postID,
        userID,
      ]);
      setLikedPosts((prev) => ({ ...prev, [postID]: false }));
      setPostLikes((prev) => ({
        ...prev,
        [postID]: prev[postID] > 0 ? prev[postID] - 1 : 0,
      }));
    } else {
      await db.runAsync(
        "INSERT INTO `like` (PostID, UserID) VALUES (?, ?)",
        [postID, userID]
      );
      setLikedPosts((prev) => ({ ...prev, [postID]: true }));
      setPostLikes((prev) => ({
        ...prev,
        [postID]: (prev[postID] || 0) + 1,
      }));
    }
  } catch (e) {
    console.log("Error handling like/unlike:", e);
  }
};

function ProfileScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [newUsername, setNewUsername] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [editPostModalVisible, setEditPostModalVisible] = React.useState(false);
  const [postToEdit, setPostToEdit] = React.useState("");
  const [postIDToEdit, setPostIDToEdit] = React.useState(null);
  const [userID, setUserID] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [likedPosts, setLikedPosts] = React.useState({});
  const [postLikes, setPostLikes] = React.useState({});

  const fetchUserData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedEmail = await AsyncStorage.getItem("userEmail");
      setUsername(storedUsername || "Guest");
      setEmail(storedEmail || "No email provided");
    } catch (e) {
      console.log("Error fetching user data:", e);
    }
  };

  const fetchUserID = async () => {
    const email = await AsyncStorage.getItem("userEmail");
    if (email) {
      const db = await SQLite.openDatabaseAsync("friendfinder");
      const result = await db.getFirstAsync("SELECT UserID FROM user WHERE email = ?", email);
      setUserID(result.UserID);
    }
  };

  const fetchPosts = async () => {
    if (userID) {
      const userPosts = await fetchUserPosts(userID);
      setPosts(userPosts);

      const initialLikes = userPosts.reduce((acc, post) => {
        acc[post.PostID] = post.LikeCount;
        return acc;
      }, {});
      setPostLikes(initialLikes);
    }
  };

  React.useEffect(() => {
    fetchUserData();
    fetchUserID();
  }, []);

  React.useEffect(() => {
    if (userID) {
      fetchPosts();
    }
  }, [userID]);

  const handleLike = (postID) => {
    handleLikePost(postID, userID, setLikedPosts, setPostLikes);
  };

  const handleCommentPress = (postID) => {
    navigation.navigate("Comments", {
      postID: postID,
      userID: userID,
    });
  };

  const updateUsername = async () => {
    if (newUsername.trim() === "") {
      Alert.alert("Error", "Username cannot be empty.");
      return;
    }
    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");
      await AsyncStorage.setItem("username", newUsername);
      await db.runAsync("UPDATE user SET Username = ? WHERE UserID = ?", [newUsername, userID]);
      
      setUsername(newUsername);
      setNewUsername("");
      setModalVisible(false);

      Alert.alert("Success", "Username updated successfully!");
    } catch (e) {
      console.log("Error updating username:", e);
      Alert.alert("Error", "Failed to update username.");
    }
  };

  // Handle post edit
  const editPost = async () => {
    if (postToEdit.trim() === "") {
      Alert.alert("Error", "Post content cannot be empty.");
      return;
    }
    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");
      await db.runAsync("UPDATE post SET Content = ? WHERE PostID = ?", [postToEdit, postIDToEdit]);

      fetchPosts(); // Refresh the posts list
      setEditPostModalVisible(false); // Close modal
    } catch (e) {
      console.log("Error updating post:", e);
      Alert.alert("Error", "Failed to update post.");
    }
  };

  // Handle post deletion
  const deletePost = async (postID) => {
    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");
      await db.runAsync("DELETE FROM post WHERE PostID = ?", [postID]);
      
      fetchPosts(); // Refresh the posts list after deletion
    } catch (e) {
      console.log("Error deleting post:", e);
      Alert.alert("Error", "Failed to delete post.");
    }
  };
  const confirmDelete = (postID) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",  // Close the alert without doing anything
        },
        {
          text: "Delete",
          style: "destructive",  // Red button style for deletion
          onPress: () => deletePost(postID),  // Proceed with deletion
        },
      ],
      { cancelable: true }
    );
  };
  
  // Logout functionality
  const logout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: "Signin" }],
      });
    } catch (e) {
      console.log("Error logging out:", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 15 }}>
      <Text style={[externalStyles.title, styles.alignCenter]}>Profile</Text>
      <View style={[externalStyles.header, { justifyContent: "space-between" }]}>
        <View style={externalStyles.header}>
          <Text style={externalStyles.headerText}>
            {username} {"\n"}
            <Text
              style={externalStyles.subHeaderText}
              onPress={() => setModalVisible(true)}
            >
              Edit Profile
            </Text>
          </Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Editing Username */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new username"
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={updateUsername} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Editing Post */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editPostModalVisible}
        onRequestClose={() => setEditPostModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Post</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit your post"
              value={postToEdit}
              onChangeText={setPostToEdit}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={editPost} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditPostModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Display the logged-in user's posts */}
      {posts.length === 0 ? (
        <Text style={styles.noPostsText}>You have not posted yet.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.PostID.toString()}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <View style={styles.postHeader}>
                <Text style={{ fontWeight: "bold" }}>{item.Username}</Text>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setPostIDToEdit(item.PostID);
                      setPostToEdit(item.Content); // Set current post content for editing
                      setEditPostModalVisible(true);
                    }}
                  >
                    <AntDesign name="edit" size={18} color="black" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => confirmDelete(item.PostID)}>
                    <AntDesign name="delete" size={18} color="black" style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text>{item.Content}</Text>

              {/* Line separator */}
              <View style={styles.separator} />

              {/* Action Buttons (Like & Comment) */}
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  onPress={() => handleLike(item.PostID)}
                  style={styles.actionButton}
                >
                  <AntDesign name="like2" size={18} color="black" />
                  <Text style={styles.actionText}>
                    {postLikes[item.PostID] ? postLikes[item.PostID] : 0} Likes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCommentPress(item.PostID)}
                  style={styles.actionButton}
                >
                  <EvilIcons name="comment" size={24} color="black" />
                  <Text style={styles.actionText}>Comment</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}


const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

const styles = StyleSheet.create({
  alignCenter: {
    textAlign: "center",
    paddingTop: 40,
  },
  noPostsText: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 16,
    color: "#888",
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '30%',
  },
  
  icon: {
    marginLeft: 10,
  }
,  
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#00A8E8",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin:10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    margin:10,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  box: {
    margin: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginVertical: 10,  // Add space above and below the separator
  },

  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionText: {
    marginLeft: 5,  // Space between icon and text
    fontSize: 14,
    color: "black",
  },
});
