import * as React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";


const db = SQLite.openDatabaseAsync("friendfinder");


function MessagesScreen({ navigation }) {
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [username, setUsername] = React.useState(null);
  const flatListRef = React.useRef(null); 

  React.useEffect(() => {
    const initDB = async () => {
      try {
        const db = await SQLite.openDatabaseAsync("friendfinder");
 
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            content TEXT NOT NULL,
            timestamp TEXT NOT NULL
          );
        `);
      } catch (e) {
        console.log(e);
      }
    };

    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
        } else {
          Alert.alert("No username found", "Please log in again.");
        }
      } catch (e) {
        console.log("Error fetching username", e);
      }
    };

    initDB();
    getUsername();
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");

      const result = await db.getAllAsync(`
        SELECT * FROM messages ORDER BY id ASC
      `);

      setMessages(result.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp).toLocaleString(), 
      })));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (message.trim() === "") {
      Alert.alert("Message cannot be empty.");
      return;
    }
    if (!username) {
      Alert.alert("Please log in to send a message.");
      return;
    }

    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");
      const timestamp = new Date().toISOString(); 

      await db.runAsync(
        "INSERT INTO messages (username, content, timestamp) VALUES (?, ?, ?)",
        [username, message, timestamp]
      );

      setMessage(""); 
      fetchMessages(); 

      flatListRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderItem = ({ item }) => {
    const isUserMessage = item.username === username;
  
    return (
      <View>
        {!isUserMessage && (
          <Text style={styles.username}>{item.username}</Text>
        )}
        <View
          style={[
            styles.messageItem,
            isUserMessage ? styles.userMessage : styles.otherMessage,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isUserMessage ? styles.userText : styles.otherText,
            ]}
          >
            {item.content}
          </Text>
        </View>
  
        <Text
          style={[
            styles.timestamp,
            isUserMessage ? styles.userTimestamp : styles.otherTimestamp,
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef} 
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesList}
       
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const MessagesStack = createNativeStackNavigator();

export default function MessagesStackScreen() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ title: "Global Chat" }}
      />
    </MessagesStack.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesList: {
    padding: 16,
    paddingBottom: 80,
  },
  messageItem: {
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
  },
  username: {
    marginBottom: 0,
    marginBottom:-8,
    fontSize: 12,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: "#fff",
  },
  otherText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  timestamp: {
    fontSize: 10,
    color: "#888",
    marginTop: -5,
    marginBottom:12,
  },
  userTimestamp: {
    textAlign: "right", 
  },
  otherTimestamp: {
    textAlign: "left",
  },
});
