// HomeDrawer.js
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import ContactUsScreen from './ContactUsScreen';
const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name='Home' component={HomeScreen} options={{ title: 'Home' }} />
      <Drawer.Screen name='Contact Us' component={ContactUsScreen} options={{ title: 'Contact Us' }} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
