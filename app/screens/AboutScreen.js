import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


function AboutScreen() {
  const navigation = useNavigation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const valueRef = ref(rtdb, "value");
    return onValue(valueRef, (snapshot) => {
      setValue(snapshot.val());
    });
  }, []);

  const handlePlus = () => {
    const valueRef = ref(rtdb, "value");
    set(valueRef, value + 1);
  };

  const handleMinus = () => {
    const valueRef = ref(rtdb, "value");
    set(valueRef, value - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>Counter </Text>
        <Text style={styles.value}>{value}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleMinus}>
            <Text style={styles.countText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePlus}>
            <Text style={styles.countText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#786c3b",
    justifyContent: "center",
    alignItems: "center",
  },
  countContainer: {
    justifyContent: "center",
    backgroundColor: "#dad5ae",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
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
    backgroundColor: "#2c786c",
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
  },
  buttonContainer: {
    flexDirection: "row",
  },
  value: {
    fontSize: 100,
    color: "#434a2a",
    textAlign: "center",
  },
});

export default AboutScreen;