import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue, set } from "firebase/database";
import { rtdb } from "./../../firebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons

const HomeScreen = () => {
  const navigation = useNavigation();
  const [Count, setValue] = useState(0);
  
  const [borderColorAnimation] = useState(new Animated.Value(0));
  const colors = ["#ff69b4", "#ff0000", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"];

  useEffect(() => {
    const valueRef = ref(rtdb, "Count");
    return onValue(valueRef, (snapshot) => {
      setValue(snapshot.val());
    });
  }, []);

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

  const handlePlus = () => {
    const valueRef = ref(rtdb, "Count");
    set(valueRef, Count + 1);
  };

  const handleMinus = () => {
    const valueRef = ref(rtdb, "Count");
    set(valueRef, Count - 1);
  };

  return (
    <ImageBackground style={styles.container} source={require("../assets/images/Background.jpg")}>
      <Animated.View style={[styles.countContainer, { borderColor: borderColorInterpolate }]}>
        <Text style={styles.countText}>Counting Machine Iot</Text>
        <Text style={styles.value}>{Count}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePlus}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleMinus}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("AboutScreen")}>
          <Ionicons name="information-circle-outline" size={24} color="white" />
          <Text style={styles.buttonText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("LoginScreen")}>
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  countContainer: {
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    margin: 20,
    elevation: 5,
  },
  countText: {
    fontSize: 24,
    color: "#336234",
    textAlign: "center",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(44, 120, 108, 0.8)", // Semi-transparent background
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#33cccc",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    width: 100,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  value: {
    fontSize: 100,
    color: "#434a2a",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default HomeScreen;