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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../firebaseConfig";
import { useFonts } from "expo-font";
import Ionicons from "react-native-vector-icons/Ionicons";

const colors = [
  "#ff69b4", "#ff0000", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"
]; // Rainbow colors

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [borderColorAnimation] = useState(new Animated.Value(0));

  const [fontsLoaded, error] = useFonts({
    HanumanBlack: require("../assets/fonts/Hanuman-Black.ttf"),
    PlayfairDisplayBlack: require("../assets/fonts/PlayfairDisplay-Black.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Error loading fonts:", error);
    }
  }, [error]);

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

  const isFormValid = () =>
    email.includes("@") && password === confirmPassword && password.length >= 8;

  const handleSignup = async () => {
    if (!isFormValid()) {
      Alert.alert(
        "Try again",
        "Please enter a valid email and matching passwords with at least 8 characters"
      );
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigation.navigate("LoginScreen");
    } catch (error) {
      Alert.alert("Error", `Error creating user: ${error.message}`);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground style={styles.container} source={require("../assets/images/Background.jpg")}>
      <Animated.View style={[styles.blurredContainer, { borderColor: borderColorInterpolate }]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            {password.length > 0 && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="rgba(255, 255, 255, 0.7)" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {confirmPassword.length > 0 && (
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="rgba(255, 255, 255, 0.7)" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Create</Text>
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
    borderColor: 'rgba(255, 255, 255, 0.7)', // Set input border color
    padding: 10,
    width: "100%",
    borderRadius: 10,
    fontFamily: "HanumanBlack",
    textAlign: "center",
    color: 'rgba(255, 255, 255, 0.7)',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "PlayfairDisplayBlack",
    color: 'white',
  },
});

export default SignupScreen;