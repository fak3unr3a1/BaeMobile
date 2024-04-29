import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// const BASE_URL = 'https://y4u5dmmbw7.eu-west-1.awsapprunner.com'; // Base URL
const BASE_URL = 'http://localhost:8000/';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user-data`, {
        email,
        password,
      });

      // Store the user's email in AsyncStorage upon successful sign-in
      await AsyncStorage.setItem('email', email);

      // Handle successful sign-in
      console.log(response.data);
      navigation.navigate('Home'); // Navigate to home screen upon successful sign-in
    } catch (error) {
      // Handle sign-in error
      console.error('Sign In Error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { data } = error.response;
        Alert.alert('Error', data.error || 'Invalid email or password');
      } else if (error.request) {
        // The request was made but no response was received
        Alert.alert('Error', 'No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert('Error', 'An error occurred while making the request');
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/signin`, {
        email,
        password,
      });

      // Handle successful sign-up
      console.log(response.data);
      navigation.navigate('Home'); // Navigate to home screen upon successful sign-up
    } catch (error) {
      // Handle sign-up error
      console.error('Sign Up Error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { data } = error.response;
        Alert.alert('Error', data.error || 'Error during sign-up');
      } else if (error.request) {
        // The request was made but no response was received
        Alert.alert('Error', 'No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert('Error', 'An error occurred while making the request');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="white" // Set placeholder text color to white
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        placeholderTextColor="white" // Set placeholder text color to white
      />
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Changed background color to black
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Changed title color to white
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff', // Changed input text color to white
  },
  signInButton: {
    backgroundColor: 'blue', // Changed sign in button color to green
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: 'blue', // Changed sign up button color to blue
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
