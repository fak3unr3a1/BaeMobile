import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// const BASE_URL = 'https://y4u5dmmbw7.eu-west-1.awsapprunner.com';
const BASE_URL = 'http://localhost:8000/';

const ConversationHistoryScreen = () => {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchConversationHistory = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        if (!storedEmail) {
          console.log('User not logged in');
          return;
        }

        setUserEmail(storedEmail);

        const response = await axios.get(`${BASE_URL}/conversation_history_react`, {
          headers: {
            'User-Email': storedEmail,
          },
        });

        if (response.data.success) {
          setConversationHistory(response.data.conversation_history);
        } else {
          setError(response.data.error);
        }
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching conversation history');
        console.error('Error fetching conversation history:', error);
      }
    };

    fetchConversationHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversation History</Text>
      {error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : conversationHistory.length > 0 ? (
        <FlatList
          data={conversationHistory}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.query}>User Query: {item.user_query}</Text>
              <Text style={styles.response}>AI Response: {item.ai_response}</Text>
              <Text style={styles.timestamp}>Timestamp: {item.timestamp}</Text>
            </View>
          )}
          keyExtractor={(item) => item._id.toString()}
        />
      ) : (
        <Text style={styles.message}>No conversation history available</Text>
      )}
      {userEmail && <Text style={styles.email}>User Email: {userEmail}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    fontFamily: 'Arial', // Change the font family
    textAlign: 'center', // Center align the title
  },
  error: {
    color: 'red',
    marginBottom: 20,
    fontFamily: 'Arial', // Change the font family
  },
  message: {
    color: 'white',
    marginBottom: 20,
    fontFamily: 'Arial', // Change the font family
  },
  historyItem: {
    marginBottom: 40,
  },
  query: {
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Arial', // Change the font family
  },
  response: {
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Arial', // Change the font family
  },
  timestamp: {
    color: 'lightgray',
    fontFamily: 'Arial', // Change the font family
  },
  email: {
    color: 'white',
    fontFamily: 'Arial', // Change the font family
  },
});

export default ConversationHistoryScreen;
