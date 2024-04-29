import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TextEditorScreen = () => {
  const [text, setText] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchUserEmail() {
      const storedEmail = await AsyncStorage.getItem('email');
      console.log('Stored Email:', storedEmail); // Add this line for debugging
      if (storedEmail) {
        setUserEmail(storedEmail);
      } else {
        console.log('User not logged in, navigate to sign-in screen');
        navigation.navigate('SignIn'); // Navigate to sign-in screen if email is not found
      }
    }
    fetchUserEmail();
  }, [navigation]);
  

  const saveData = async () => {
    try {
      console.log('Saving data...');
      console.log('Text:', text);
      console.log('User Email:', userEmail);
      const response = await axios.post(
        'http://localhost:8000/api/store-text-data',
        { text },
        {
          headers: {
            'User-Email': userEmail, // Include user email as a header
          },
        }
      );
      console.log('Response:', response.data);
      Alert.alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error.message);
      Alert.alert('Error saving data:', error.message);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        onChangeText={setText}
        value={text}
        placeholder="Type your text here..."
        placeholderTextColor="#999"
      />
      <Button title="Save Data" onPress={saveData} />
    </View>
  );
};

// Styles...
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
    },
  });

export default TextEditorScreen;
