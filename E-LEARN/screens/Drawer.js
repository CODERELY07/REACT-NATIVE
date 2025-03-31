import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import ReadingScreen from './ReadingScreen';
import VideoScreen from './VideoScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="ReadingScreen" component={ReadingScreen} />
      <Drawer.Screen name="VideoScreen" component={VideoScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
