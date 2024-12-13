import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue, set } from "firebase/database";
import { rtdb } from "./../../firebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [Count, setValue] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleReset = () => {
    const valueRef = ref(rtdb, "Count");
    set(valueRef, 0); // Reset count in Firebase
    const resetRef = ref(rtdb, "reset");
    set(resetRef, 1).then(() => {
      console.log("Reset command sent to Arduino.");
    }).catch((error) => {
      console.error("Error sending reset command:", error);
    });
  };

  const handleLogout = () => {
    console.log("Logged out");
    navigation.navigate("LoginScreen");
  };

  return (
    <ImageBackground style={styles.container} source={require("../assets/images/Background.jpg")}>
      <Animated.View style={[styles.countContainer, { borderColor: borderColorInterpolate }]}>
        <Text style={styles.countText}>Conveyor Counter</Text>
        <Text style={styles.value}>{Count}</Text>
      </Animated.View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.profileButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="person-circle-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate("AboutScreen")}>
              <Text style={styles.buttonText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  countContainer: {
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
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
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 10,
    right: 150,
    padding: 10,
    backgroundColor: "rgba(44, 120, 108, 0.8)",
    borderRadius: 10,
  },
  resetButton: {
    backgroundColor: "#ff4d4d",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: "#33cccc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
});

export default HomeScreen;