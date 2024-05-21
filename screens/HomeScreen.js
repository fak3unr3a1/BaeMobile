// HomeScreen.js

// Import React and necessary components from React Native
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';



// Define the HomeScreen component
const HomeScreen = ({ navigation }) => {
  // Functions to navigate to different screens
  const navigateToConversationHistory = () => {
    navigation.navigate('ConversationHistory');
  };

  const navigateToIndex = () => {
    navigation.navigate('Index');
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  const navigateToStore = () => {
    navigation.navigate('Store');
  };

  const navigateToContacts = () => {
    navigation.navigate('Contacts');
  };

  const navigateToPhoneCall = () => {
    navigation.navigate('PhoneCall');
  };

  const navigateToTextEditor = () => {
    navigation.navigate('TextEditor');
  };

  const navigateToStoredData = () => {
    navigation.navigate('StoredData');
  };

  const navigateToCalendar = () => {
    navigation.navigate('Calendar');
  };

  // Render the component
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToConversationHistory}>
          <Text style={styles.buttonText}>See Conversation History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToIndex}>
          <Text style={styles.buttonText}>Interact With AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToSettings}>
          <Text style={styles.buttonText}>Go to Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToStore}>
          <Text style={styles.buttonText}>Go to Ability Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToCalendar}>
          <Text style={styles.buttonText}>Go to Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToStoredData}>
          <Text style={styles.buttonText}>View Stored Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToContacts}>
          <Text style={styles.buttonText}>Show Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToTextEditor}>
          <Text style={styles.buttonText}>Open Text Editor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToPhoneCall}>
          <Text style={styles.buttonText}>Make Phone Call</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#0000ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

// Export the component
export default HomeScreen;
