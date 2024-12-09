import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font'; // Import useFonts from expo-font

const GetStartedScreen = () => {
  const navigation = useNavigation();

  // Load custom fonts
  const [fontsLoaded, fontsError] = useFonts({
    HanumanBlack: require("../assets/fonts/Hanuman-Black.ttf"),
    PlayfairDisplayBlack: require("../assets/fonts/PlayfairDisplay-Black.ttf"),
    Bridal: require("../assets/fonts/Bridal.otf"),
  });

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/Background.jpg')} // Background image
        style={styles.background}
      >
        <View style={styles.content}>
          <Text style={styles.title}>WELCOME TO CONVEYOR COUNTER</Text>
          <View style={styles.gifContainer}>
            <Image source={require('../assets/images/giffffy.gif')} style={styles.gif} />
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Copyright @2024 TLE Carpentry App</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  gif: {
    width: 200,
    height: 150,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  centerImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    color: '#f5f5dc', // Set title color to beige
    padding: 1,
    bottom: 70,
    fontSize: 40,
    fontFamily: "HanumanBlack",
   textAlign: "center"
  },
  description: {
    fontSize: 16,
    color: '#f5f5dc',
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
    fontFamily: 'Roboto-Medium', // Use custom font for description
  },
  button: {
    backgroundColor: 'semi-transparent',
    borderRadius: 10,
    padding: 15,
    width: 300,
    top: 40,
    alignItems: 'center',
    borderColor: '#ffff',
    borderWidth: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    color: '#ffff',
    fontSize: 14,
  },
});

export default GetStartedScreen;