import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image,TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';  
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const [username, setUsername] = useState('');

    const navigation = useNavigation();
    const getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
            setUsername(value);
            }
        } catch (e) {
            console.log("Error: ", e);
        }
    };
    const handleLogout = async () => {
        await AsyncStorage.clear();

        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };
    useEffect(()=>{
        getUsername();
    },[]);
    return (
        <View style={styles.homeContainer}>
            <View style={styles.searchBar}>
                <View>
                    <Text style={{fontWeight:'bold',fontSize:18}}>{username}</Text>
                    <TouchableOpacity style={styles.cart} 
                            onPress={() => navigation.navigate("Favorites")}>
                        <AntDesign name="heart" size={34} color="#FF6B6B" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.heading}>Discover Your Vintage</Text>
                <Text style={styles.description}>
                    The year or place in which wine especially wine of high quality, was produced.
                </Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/71iO5AA8tNL._SS400_.jpg' }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
};

export default Home;
