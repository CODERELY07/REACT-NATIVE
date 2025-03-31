import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import externalStyles from "../style/externalStyle";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import CommentsScreen from "./CommnetsScreen";


// Database initialization
const initDB = async () => {
  console.log("Init Db");
  try {
    const db = await SQLite.openDatabaseAsync("friendfinder"); 
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user (
        UserID INTEGER PRIMARY KEY AUTOINCREMENT,
        Username TEXT NOT NULL,
        Email TEXT NOT NULL,
        Profile TEXT,
        Password TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS post (
        PostID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER NOT NULL,
        Content TEXT NOT NULL,
        FOREIGN KEY (UserID) REFERENCES user(UserID)
      );
      CREATE TABLE IF NOT EXISTS comment (
        CommentID INTEGER PRIMARY KEY AUTOINCREMENT,
        PostID INTEGER NOT NULL,
        UserID INTEGER NOT NULL,
        Content TEXT NOT NULL,
        FOREIGN KEY (PostID) REFERENCES post(PostID),
        FOREIGN KEY (UserID) REFERENCES user(UserID)
      );
      CREATE TABLE IF NOT EXISTS like (
      LikeID INTEGER PRIMARY KEY AUTOINCREMENT,
      PostID INTEGER NOT NULL,
      UserID INTEGER NOT NULL,
      FOREIGN KEY (PostID) REFERENCES post(PostID),
      FOREIGN KEY (UserID) REFERENCES user(UserID),
      UNIQUE(PostID, UserID) -- Ensures that each user can like a post only once
    );

    `);

    console.log("Database initialized successfully");
  } catch (e) {
    console.log("Error: ", e);
  }
};

initDB();

// Fetch userID based on email
const fetchUserIDFromDb = async (email) => {
  try {
    const db = await SQLite.openDatabaseAsync("friendfinder");
    const result = await db.getFirstAsync(
      "SELECT UserID FROM user WHERE email = ?",
      email
    );

    if (result) {
      return result.UserID;
    } else {
      console.log("No user found with this email.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching UserID:", error);
    return null;
  }
};

// Fetch username based on email
const fetchUsernameFromDb = async (email) => {
  try {
    const db = await SQLite.openDatabaseAsync("friendfinder");
    const result = await db.getFirstAsync(
      "SELECT Username FROM user WHERE email = ?",
      email
    );

    if (result) {
      return result.Username;
    } else {
      console.log("No user found with this email.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching username:", error);
    return null;
  }
};


const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0); 
  const [email, setEmail] = useState(null); 

  const selectPost = async (email) => {
    if (!email) {
      console.log("Email is not available");
      return; 
    }

    console.log("Select Post");
    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");
      const allRows = await db.getAllAsync(`
        SELECT post.PostID, post.Content,  user.Username, user.UserID
        FROM post
        JOIN user ON post.UserID = user.UserID
        WHERE user.email != ? 
      `, [email]);

      console.log("Fetched Posts: ", allRows);
      setPosts(allRows);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    const getEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        if (storedEmail) {
          setEmail(storedEmail); 
        } else {
          console.log("Email is missing from AsyncStorage");
        }
      } catch (error) {
        console.error("Error retrieving email from AsyncStorage:", error);
      }
    };

    getEmail();
  }, []);

  useEffect(() => {
    if (email) {
      selectPost(email); 
    }
  }, [email, refreshCount]);

  const refresh = () => {
    setRefreshCount(prevCount => prevCount + 1);
  };

  return { posts, refresh };
};

const insertPost = async (userID, content) => {
  console.log("Insert Post");
  if (content.trim() === "") {
    console.log("Content cannot be empty");
    return;
  }
  try {
    const db = await SQLite.openDatabaseAsync("friendfinder");

    const result = await db.runAsync(
      "INSERT INTO post (UserID, Content) VALUES (?, ?)",
      userID,
      content
    );
    console.log("Inserted Post ID:", result.lastInsertRowId);
    console.log("Changes:", result.changes);

    await db.closeAsync();
  } catch (e) {
    console.log("Error: ", e);
  }
};

// Delete post function
const deletePost = async(postID) => {
  console.log('Delete Post');
  const db = await SQLite.openDatabaseAsync('friendfinder'); // Open the DB

  try {
    // Check if post exists before deleting
    const result = await db.getFirstAsync('SELECT PostID FROM post WHERE PostID = ?', [postID]);
    if (result) {
      // Post exists, proceed with deletion
      await db.runAsync('DELETE FROM post WHERE PostID = ?', [postID]);
      console.log(`Deleted Post ID: ${postID}`);
    } else {
      console.log(`No post found with ID: ${postID}`);
    }
  } catch (e) {
    console.log("Error deleting post: ", e);
  }
};

function HomeScreen() {
  const [username, setUsername] = useState(null);
  const [userID, setUserID] = useState(null);
  const [content, setContent] = useState("");
  const [likeCounts, setLikeCounts] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [likedPosts, setLikedPosts] = useState({}); 

  const fetchUserLikes = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");
      const userID = await AsyncStorage.getItem("userID");
  
      const allLikes = await db.getAllAsync(
        "SELECT PostID FROM like WHERE UserID = ?",
        [userID]
      );
  
      const likesMap = {};
      allLikes.forEach((like) => {
        likesMap[like.PostID] = true;
      });
  
      setUserLikes(likesMap);
    } catch (e) {
      console.log("Error fetching user likes:", e);
    }
  };
  
  useEffect(() => {
    fetchUserLikes();
  }, [posts]); 
  
  const handleLikePost = async (postID) => {
    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");
      const userID = await AsyncStorage.getItem("userID");
      if (!userID) {
        console.log("User not logged in");
        return;
      }
  
      // Check if the user has already liked the post
      const existingLike = await db.getFirstAsync(
        "SELECT * FROM like WHERE PostID = ? AND UserID = ?",
        [postID, userID]
      );
  
      if (existingLike) {
        // If the user already liked the post, remove the like (unlike)
        await db.runAsync("DELETE FROM like WHERE PostID = ? AND UserID = ?", [postID, userID]);
        console.log("Post unliked successfully");
        setLikedPosts(prev => ({ ...prev, [postID]: false })); // Update the state to reflect unliked status
      } else {
        // If the user hasn't liked the post, add a like
        await db.runAsync(
          "INSERT INTO like (PostID, UserID) VALUES (?, ?)",
          [postID, userID]
        );
        console.log("Post liked successfully");
        setLikedPosts(prev => ({ ...prev, [postID]: true })); // Update the state to reflect liked status
      }
  
      refresh(); // Trigger a refresh to update the like count
    } catch (e) {
      console.log("Error handling like/unlike:", e);
    }
  };
  
  
  
const fetchLikesCount = async (postID) => {
  try {
    const db = await SQLite.openDatabaseAsync("friendfinder");
    
    const result = await db.getFirstAsync(
      "SELECT COUNT(*) AS likeCount FROM like WHERE PostID = ?",
      [postID]
    );

    setLikeCounts((prev) => ({
      ...prev,
      [postID]: result.likeCount || 0,
    }));
  } catch (e) {
    console.log("Error fetching like count:", e);
  }
};

  const navigation = useNavigation();
  useEffect(() => {
    const getUserID = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      if (email) {
        const db = await SQLite.openDatabaseAsync("friendfinder");
        const result = await db.getFirstAsync("SELECT UserID FROM user WHERE email = ?", email);
        setUserID(result.UserID);
      }
    };
    
    getUserID();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");
      const allPosts = await db.getAllAsync(`
        SELECT post.PostID, post.Content, user.Username 
        FROM post 
        JOIN user ON post.UserID = user.UserID
      `);
     
    } catch (e) {
      
    }
  };

  // Use the posts hook to get posts and the refresh function
  const { posts, refresh } = usePosts();

  useEffect(() => {
    let isMounted = true;
    const getEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        if (email) {
          // Fetch username and userID if email is available
          const fetchedUsername = await fetchUsernameFromDb(email);
          const fetchedUserId = await fetchUserIDFromDb(email);
          setUsername(fetchedUsername);
          setUserID(fetchedUserId);
        } else {
          console.log("No email found.");
        }
      } catch (error) {
        console.error("Error retrieving email or fetching username:", error);
      }
    };

    getEmail();
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    posts.forEach((post) => {
      fetchLikesCount(post.PostID); 
    });
  }, [posts]);
  
  const handleInsertPost = async () => {
    if (content.trim() === "") {
      console.log("Content cannot be empty");
      return;
    }
    // Insert the post and refresh the post list
    await insertPost(userID, content);
    setContent(""); 
    refresh(); 
  };

  const handleDeletePost = async (postID) => {
    await deletePost(postID);
    setContent(""); 
    refresh(); 
  };
  console.log("Logged-in user ID: ", userID);
  const handleCommentPress = (postID) => {
    navigation.navigate("Comments", {
      postID: postID, 
      userID: userID
    });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.line}>
        <Text style={styles.logoText}>FriendFinder</Text>
      </View>
      <View style={externalStyles.header}>
        <Text style={externalStyles.headerText}>
          {username} {"\n"}
          <Text style={externalStyles.subHeaderText}>Join the fun!</Text>
        </Text>
      </View>
      <View style={styles.box}>
        <View>
          <TextInput
            style={styles.postInput}
            placeholder="Enter post content"
            value={content}
            onChangeText={setContent}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.postButton}
            onPress={handleInsertPost}
          >
            <Text style={{fontSize: 14, fontWeight: 'bold', color:'#fff'}}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
    showsVerticalScrollIndicator={false}
    data={posts}
  keyExtractor={(item) => item.PostID.toString()}
  renderItem={({ item }) => (
    <View style={[styles.box, { paddingVertical: 10, marginLeft: 1, width: '99%', flexDirection: 'column', alignItems: 'left' }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 5 }}>
        <Text style={{ fontWeight: "bold" }}>{item.Username}</Text>
        {userID === item.UserID && (
          <TouchableOpacity style={{ marginLeft: 'auto'}} onPress={() => handleDeletePost(item.PostID)}>
            <AntDesign name="ellipsis1" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text>{item.Content}</Text> 
      </View>

      <View style={{ borderTopColor: '#B0B0B0', marginTop: 10, borderTopWidth: 1,marginTop:10 }}>
        <Text>{item.Comment}</Text> 
      </View>
      {likedPosts[item.PostID] && (
        <Text style={{ color: 'green', fontSize: 12, marginBottom: 15,marginTop:-12 }}>You like this post</Text>
      )}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.postIcon}
          onPress={() => handleLikePost(item.PostID)} 
        >
          <AntDesign name="like2" size={18} color="black" />
          <Text>{likeCounts[item.PostID] || 0}</Text> 
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postIcon}
          onPress={() => handleCommentPress(item.PostID)}
        >
          <EvilIcons name="comment" size={24} color="black" />
          <Text>Comment</Text>
        </TouchableOpacity>
      </View>

     
    </View>
  )}
/>


    </SafeAreaView>
  );
}

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" , headerShown: false}}
      />
      <HomeStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: "Comments" }}
      />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#F4F6FF",
  },
  quoteBox: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    backgroundColor: "#fff",
    shadowRadius: 3,
    borderRadius: 3,
    padding: 5,
    elevation: 5,
    marginTop: 10,
  },
  quoteText: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "center",
  },
  sectionTitle: {
    fontWeight: "500",
    fontSize: 18,
    marginTop: 30,
  },
  friendList: {
    marginTop: 15,
  },
  friendItem: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 1,
    padding: 10,
  },
  friendName: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  friendStatus: {
    color: "#717070",
    fontWeight: "400",
    fontSize: 12,
  },
  nearbyList: {
    marginTop: 15,
  },
  logoText: {
    fontFamily: "Arial", // Facebook uses a clean sans-serif font like Arial
    fontSize: 24,
    color: "#00A8E8", 
    fontWeight: "bold", 
    letterSpacing: 0.5, 
  },
  postInput: {
    backgroundColor: '#F4F6FF',
    height: 50,
    padding: 15,
    width: 245,
    borderRadius: 25,
  },
  postButton: {
    borderRadius: 50,
    backgroundColor: '#00A8E8',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    marginBottom: 10,
    padding: 10,
    paddingVertical: 20,
    width: '100%',
    backgroundColor: '#F4F6FF',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    backgroundColor: '#fff',
    shadowRadius: 3,
    elevation: 2,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: -10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  postIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});