import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native'; // Import ScrollView
import axios from 'axios';

const ConversationHistoryScreen = () => {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversationHistory = async () => {
      try {
        const userEmail = sessionStorage.getItem('email');
        if (!userEmail) {
          console.log('User not logged in');
          return;
        }

        const response = await axios.get('http://localhost:8000/conversation_history_react', {
          headers: {
            'User-Email': userEmail,
          },
        });

        if (response.data.success) {
          setConversationHistory(response.data.conversation_history);
        } else {
          setError(response.data.error);
        }
      } catch (error) {
        setError(error.response.data.error || 'An error occurred while fetching conversation history'); // Set error state to display error message
        console.error('Error fetching conversation history:', error);
      }
    };

    fetchConversationHistory();
  }, []);

  return (
    <ScrollView> {/* Wrap your content in ScrollView */}
      <View style={{ paddingBottom: 20 }}> {/* Adding padding to the bottom to ensure content doesn't get cut off */}
        <Text>Conversation History</Text>
        {error ? (
          <Text>Error: {error}</Text>
        ) : conversationHistory.length > 0 ? (
          <FlatList
            data={conversationHistory}
            renderItem={({ item }) => (
              <View>
                <Text>User Query: {item.user_query}</Text>
                <Text>AI Response: {item.ai_response}</Text>
                <Text>Timestamp: {item.timestamp}</Text>
              </View>
            )}
            keyExtractor={(item) => item._id.toString()} // Convert ObjectId to string
          />
        ) : (
          <Text>No conversation history available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ConversationHistoryScreen;
