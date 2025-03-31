import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import Home from "./Home";
import Search from "./Search";
import ContactUs from "./ContactUs";

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={24} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="search-outline" size={24} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="ContactUs"
                component={ContactUs}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="mail-outline" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Main;
