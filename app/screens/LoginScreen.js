import React, { useState, useEffect } from "react";
import { ImageBackground, View, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from "react-native";

import { useFonts } from "expo-font";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded, fontsError] = useFonts({
    HanumanBlack: require("../assets/fonts/Hanuman-Black.ttf"),
    PlayfairDisplayBlack: require("../assets/fonts/PlayfairDisplay-Black.ttf"),
  });
  useEffect(() => {
    if (fontsError) {
      console.error("Error loading fonts:", fontsError);
    }
  }, [fontsError]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("HomeScreen");
      })
      .catch(() => {
        Alert.alert("Error", "Invalid credentials");
      });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground style={styles.container} source={require("../assets/images/")}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 300,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    fontFamily: "HanumanBlack",
  },
  button: {
    backgroundColor: "#7cccc7",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 100,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "PlayfairDisplayBlack",
  },
});

export default LoginScreen;


