import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../firebaseConfig";
import { useFonts } from "expo-font";
import Ionicons from "react-native-vector-icons/Ionicons";

const colors = [
  "#ff69b4", "#ff0000", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"
]; // Rainbow colors

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [borderColorAnimation] = useState(new Animated.Value(0));
  const [fontsLoaded, fontsError] = useFonts({
    HanumanBlack: require("../assets/fonts/Hanuman-Black.ttf"),
    PlayfairDisplayBlack: require("../assets/fonts/PlayfairDisplay-Black.ttf"),
  });

  useEffect(() => {
    if (fontsError) {
      console.error("Error loading fonts:", fontsError);
    }
  }, [fontsError]);

  useEffect(() => {
    const animateBorderColor = () => {
      Animated.loop(
        Animated.timing(borderColorAnimation, {
          toValue: colors.length - 1,
          duration: 5000,
          useNativeDriver: false,
        }),
      ).start();
    };

    animateBorderColor();
  }, [borderColorAnimation]);

  const borderColorInterpolate = borderColorAnimation.interpolate({
    inputRange: Array.from({ length: colors.length }, (_, i) => i),
    outputRange: colors,
  });

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        navigation.navigate("HomeScreen");
        clearFields();
      })
      .catch(() => {
        Alert.alert("Error", "Invalid credentials");
      });
  };

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground style={styles.container} source={require("../assets/images/Background.jpg")}>
      <Animated.View style={[styles.blurredContainer, { borderColor: borderColorInterpolate }]}>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="person" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.icon} />
            <TextInput
              style={[styles.input, { color: 'rgba(255, 255, 255, 0.7)', paddingLeft: 10 }]}
              placeholder="Username"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.icon} />
            <TextInput
              style={[styles.input, { color: 'rgba(255, 255, 255, 0.7)', paddingLeft: 10 }]}
              placeholder="Password"
              secureTextEntry={!showPassword}
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={password}
              onChangeText={setPassword}
            />
            {password.length > 0 && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="rgba(255, 255, 255, 0.7)" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.rememberMeContainer}>
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkbox}>
            {rememberMe && <Ionicons name="checkmark" size={20} color="white" />}
          </TouchableOpacity>
          <Text style={styles.rememberMeText}>Remember Me</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't you have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={styles.signupText}>Register</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blurredContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background
    borderRadius: 12,
    padding: 20,
    width: 300, // Adjusted width for better appearance
    height: 280, // Adjusted height for better appearance
    alignItems: "center",
    borderWidth: 2, // Increased border width for better visibility
    borderColor: 'rgba(255, 255, 255, 0.7)', // Set default border color
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // For Android
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  inputWrapper: {
    width: '100%',
    borderRadius: 10,
    padding: 2,
    alignItems: "center",
    position: 'relative',
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: 'white', // White border for input
    padding: 10,
    width: "100%",
    borderRadius: 10,
    fontFamily: "HanumanBlack",
    textAlign: "center",
  },
  icon: {
    position: 'absolute',
    left: 15,
    top: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  button: {
    backgroundColor: "transparent", // Transparent background for button
    borderWidth: 1,
    borderColor: 'white', // White border for button
    padding: 3,
    width: 100,
    height: 30,
    borderRadius: 10,
    marginLeft: 10, // Space between checkbox and button
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  rememberMeText: {
    color: 'white',
    marginRight: 10, // Space between text and button
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  footerText: {
    color: 'white',
    marginRight: 5,
  },
  signupText: {
    color: 'white',
    fontSize: 18,
    textDecorationLine: "underline",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "PlayfairDisplayBlack",
    color: 'white', // White text for the button
  },
});

export default LoginScreen;