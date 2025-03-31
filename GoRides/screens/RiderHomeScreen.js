import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from "react-native";
import { styles } from "../styles/globalStyles";
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RiderHomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [rides, setRides] = useState([]); 
  let db;


  const initDb = async () => {
    db = await SQLite.openDatabaseAsync('goRides');
    try {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS rides (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,  -- User who requested the ride
          current_location TEXT NOT NULL,
          destination TEXT NOT NULL,
          ride_status TEXT DEFAULT 'pending',
          rider_name TEXT,  -- New field to store the name of the rider who accepts the ride
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );

      `);
    } catch (e) {
      console.log("Error initializing DB:", e);
    }
  };

 
  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUsername(value);
      }
    } catch (err) {
      console.log("Error fetching username:", err);
    }
  };

  
  const fetchRides = async () => {
    try {
      db = await SQLite.openDatabaseAsync('goRides');
      const result = await db.getAllAsync(
        'SELECT * FROM rides WHERE ride_status IN ("pending", "accepted")'
      );
      setRides(result);
    } catch (error) {
      console.log("Error fetching rides:", error);
    }
  };


  const acceptRide = async (rideId) => {
    try {
      db = await SQLite.openDatabaseAsync('goRides');
    
      const riderName = username; 
  
   
      await db.runAsync(
        'UPDATE rides SET ride_status = "accepted", rider_name = ? WHERE id = ?',
        [riderName, rideId]
      );
      Alert.alert("Ride Accepted", "You have accepted the ride!");
      fetchRides(); 
    } catch (error) {
      console.log("Error accepting the ride:", error);
    }
  };
  


  const declineRide = async (rideId) => {
    try {
      db = await SQLite.openDatabaseAsync('goRides');
      await db.runAsync('UPDATE rides SET ride_status = "declined" WHERE id = ?', [rideId]);
      Alert.alert("Ride Declined", "You have declined the ride!");
      fetchRides(); 
    } catch (error) {
      console.log("Error declining the ride:", error);
    }
  };

  useEffect(() => {
    initDb(); 
    getUsername();
    fetchRides();
  }, []); 

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#f1f1f1" />
      <ScrollView>
        <View style={styles.homeScreenContainer}>
          <View style={[styles.applyRidersContainer, styles.boxShadows]}>
            <Text style={[styles.bold, { marginTop: 10 }]}>User Requests</Text>
            {rides.length > 0 ? rides.map((ride) => (
              <View key={ride.id} style={styles.rideItemContainer}>
                <Text>{ride.username} is looking for a ride</Text>
                <Text>Current Location: {ride.current_location}</Text>
                <Text>Destination: {ride.destination}</Text>
                <Text>Status: {ride.ride_status.charAt(0).toUpperCase() + ride.ride_status.slice(1)}</Text>
            
                {ride.ride_status === 'accepted' && ride.rider_name && (
                  <Text>Accepted by: {ride.rider_name}</Text>
                )}
                <View style={styles.inlineContainer}>
                  {ride.ride_status === 'pending' && (
                    <>
                      <TouchableOpacity
                        onPress={() => acceptRide(ride.id)}
                        style={[styles.riderButton, { backgroundColor: "#4CAF50" }]} >
                        <Text style={{ color: "#fff" }}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => declineRide(ride.id)}
                        style={[styles.riderButton, { backgroundColor: "#F44336" }]} >
                        <Text style={{ color: "#fff" }}>Decline</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            )) : <Text>No users need rides</Text>}

          </View>
        </View>
      </ScrollView>
    </View>
  );
}