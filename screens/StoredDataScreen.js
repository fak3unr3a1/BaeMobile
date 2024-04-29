import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert, Modal } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StoredDataScreen = () => {
  const [storedData, setStoredData] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [editedText, setEditedText] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
    getUserEmail();
  }, []);

  const fetchData = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        const response = await axios.get('http://localhost:8000/api/get-stored-text-data', {
          headers: {
            'User-Email': storedEmail, // Include user email as a header
          },
        });
        const { storedData } = response.data;  // Extract the stored data from the response
        setStoredData(storedData);  // Set the stored data state
      } else {
        console.log('User not logged in');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getUserEmail = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        setUserEmail(storedEmail);
      } else {
        console.log('User email not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving user email:', error);
    }
  };

  const handleItemClick = (text, index) => {
    // Set the clicked item's text as the initial value for editing
    setEditedText(text);
    setSelectedItemIndex(index);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Update the selected item in the stored data with the edited text
      const newData = [...storedData];
      newData[selectedItemIndex].text = editedText;
      setStoredData(newData);
  
      // Make sure userEmail is updated with the correct email before making the request
      const storedEmail = await AsyncStorage.getItem('email');
    
      // Send a POST request to update the stored text data
      await axios.post(
        'http://localhost:8000/api/update-stored-text',
        { text: editedText },
        {
          headers: {
            'User-Email': storedEmail, // Include user email as a header
          },
        }
      );
  
      Alert.alert('Success', 'Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save data');
    }
  };
  
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stored Data for {userEmail}</Text>
      {storedData.map((data, index) => (
        <TouchableOpacity key={index} style={styles.dataContainer} onPress={() => handleItemClick(data.text, index)}>
          <Text style={styles.timestamp}>Time: {data.timestamp}</Text>
          <Text style={styles.storedData}>{data.text.split(' ').slice(0, 4).join(' ')}</Text>
          {selectedItemIndex === index && (
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View style={styles.modalContainer}>
                <TextInput
                  style={styles.textInput}
                  multiline
                  value={editedText}
                  onChangeText={setEditedText}
                  placeholder="Continue typing..."
                  autoFocus
                />
                <Button title="Save Edit" onPress={handleSaveEdit} />
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </Modal>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dataContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  timestamp: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  storedData: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    width: '100%', // Set width to 100%
    paddingHorizontal: 20, // Remove horizontal padding
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default StoredDataScreen;
