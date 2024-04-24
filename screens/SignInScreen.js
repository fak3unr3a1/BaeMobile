import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:8000/user-data', {
        email,
        password,
      });

      // Store the user's email in session upon successful sign-in
      sessionStorage.setItem('email', email);

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
      const response = await axios.post('http://192.168.0.12:8081/signin', {
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
    <View>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignInScreen;
