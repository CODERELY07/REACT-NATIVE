import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av'; 

export default function VideoPlayerScreen({ route }) {
  const { videoUri } = route.params; 

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUri }} 
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        isLooping={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: 300,
  },
});
