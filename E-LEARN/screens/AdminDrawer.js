import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ManageVideos from './ManageVideos';
import ManageReadingsScreen from './ManageReadingScreen';
const Drawer = createDrawerNavigator();

const AdminDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="ManageVideos">
      <Drawer.Screen name="ManageVideos" component={ManageVideos} />
      <Drawer.Screen name="ManageReadingsScreen" component={ManageReadingsScreen} />
    </Drawer.Navigator>
  );
};

export default AdminDrawer;
