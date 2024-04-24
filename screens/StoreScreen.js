import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import NotificationModal from './NotificationModal'; // Import the NotificationModal component

const StoreScreen = () => {
  const [folders, setFolders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    // Retrieve email from sessionStorage
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
    
    fetch('http://localhost:8000/store-react-native', {
      credentials: 'include' // Include credentials (e.g., session token) in the request
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error fetching data:', data.error);
        } else {
          setFolders(data.folders || []);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEnableTask = (uuid) => {
    // Check if email is available
    if (!email) {
      console.error('Error enabling task: User email not available');
      return;
    }
  
    const requestData = {
      task_uuid: uuid,
      email: email,
    };
  
    fetch('http://localhost:8000/enable_task_react', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Email': email, // Include email in headers
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Display a success notification to the user
          setNotificationMessage('Task enabled successfully');
          setNotificationVisible(true);
          // Fetch updated data after enabling the task
          fetch('http://localhost:8000/store-react-native', {
            credentials: 'include'
          })
            .then(response => response.json())
            .then(data => {
              if (data.error) {
                console.error('Error fetching data:', data.error);
              } else {
                setFolders(data.folders || []);
              }
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        } else {
          if (data.error === 'Task already enabled for the user') {
            // Display a notification to the user
            setNotificationMessage(data.error);
            setNotificationVisible(true);
          } else {
            console.error('Error enabling task:', data.error);
          }
        }
      })
      .catch(error => {
        console.error('Error enabling task:', error);
      });
  };

  const filteredFolders = folders.filter(folder => {
    return (
      folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      folder.uuid.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Store Screen!</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by UUID or Task Name"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={filteredFolders}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskName}>Ability Name: {item.name}</Text>
            <Text style={styles.taskDescription}>Description: {item.description}</Text>
            <Text style={styles.taskUUID}>UUID: {item.uuid}</Text>
            <TouchableOpacity onPress={() => handleEnableTask(item.uuid)}>
              <View style={styles.enableButton}>
                <Text style={styles.enableButtonText}>Enable Task</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.uuid.toString()}
      />
      {/* Render the NotificationModal component */}
      <NotificationModal 
        visible={notificationVisible}
        message={notificationMessage}
        onClose={() => setNotificationVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  taskContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  taskUUID: {
    fontSize: 14,
    color: '#888',
  },
  enableButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  enableButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StoreScreen;
