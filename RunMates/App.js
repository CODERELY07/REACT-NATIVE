import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';
import Colors from './App/Utils/Colors';

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.CharcoalGray
  },
});
