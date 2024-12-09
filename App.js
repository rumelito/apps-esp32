import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStartedScreen from "./app/screens/GetStartedScreen.js";
import LoginScreen from "./app/screens/LoginScreen.js";
import AboutScreen from "./app/screens/AboutScreen.js";
import HomeScreen from "./app/screens/HomeScreen.js";
import SignupScreen from "./app/screens/SignupScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {


      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="GetStarted" // Set initial route to GetStarted
            screenOptions={{
              headerShown: false, // Hide header for all screens
            }}
      >
         <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
