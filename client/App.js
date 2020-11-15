import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/Home'
import {Provider as PaperProvider} from "react-native-paper";
const Stack = createStackNavigator();

const theme = {
    dark: false,
    roundness: 4,
    colors: {
      primary: '#1BB55C',
      accent: '#1BB55C',
      background: '#FFFFFF',
      surface: '#1BB55C',
      text: '#001021',
      error: '#B71F0E',
      disabled: '#BEC6C6',
      placeholder: '#1481BA',
      backdrop: '#1BB55C',
    },
    fonts: {

    },
    animation: {
      scale: 1.0,
    }
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>{
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    }</NavigationContainer>
  </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
