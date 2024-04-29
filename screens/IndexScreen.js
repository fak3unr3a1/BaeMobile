import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const BASE_URL = 'https://y4u5dmmbw7.eu-west-1.awsapprunner.com'; // Base URL
const BASE_URL = 'http://localhost:8000/';

function ChatComponent() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [resultDestPath, setResultDestPath] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const conversationContainerRef = useRef(null);

    useEffect(() => {
        AsyncStorage.getItem('email').then(email => {
            if (email) {
                setUserEmail(email);
            }
        }).catch(error => console.error('Error retrieving email:', error));
    }, []);

    useEffect(() => {
        if (conversationContainerRef.current) {
            conversationContainerRef.current.scrollToEnd({ animated: true });
        }
    }, [conversation]);

    const handleChange = (text) => {
        setUserInput(text);
    };

    const handleSubmit = async () => {
        try {
            setIsSending(true);
            const response = await fetch(`${BASE_URL}/get_response_react`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Email': userEmail,
                },
                body: JSON.stringify({ user_input: userInput })
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch response from server');
            }
    
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
    
            setConversation(prevConversation => [
                ...prevConversation,
                { user: userInput, ai: data.response }
            ]);
    
            setResponse(data.response);
            setResultDestPath(data.result_dest_path || '');
            setUserInput('');
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setIsSending(false);
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat with Assistant</Text>
            <ScrollView style={styles.conversationContainer} ref={conversationContainerRef}>
                {conversation.map((message, index) => (
                    <View key={index} style={styles.messageContainer}>
                        {message.user && <Text style={styles.userMessage}>User: {message.user}</Text>}
                        <Text style={styles.aiMessage}>AI: {message.ai}</Text>
                    </View>
                ))}
                {userInput && (
                    <View style={styles.messageContainer}>
                        <Text style={styles.userMessage}>User: {userInput}</Text>
                    </View>
                )}
            </ScrollView>
            <TextInput
                style={styles.input}
                value={userInput}
                onChangeText={handleChange}
                editable={!isSending}
            />
            <Button
                title="Send"
                onPress={handleSubmit}
                disabled={isSending}
            />
            {response && (
                <>
                    {/* <Text>Assistant Response: {response}</Text>
                    {resultDestPath && <Text>Result Destination Path: {resultDestPath}</Text>} */}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'black', // Set background color to black
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white', // Set text color to white
    },
    conversationContainer: {
        maxHeight: 300,
        marginBottom: 10,
        backgroundColor: '#f0f0f0', // This background color is not visible anymore
        borderRadius: 10,
        padding: 10,
    },
    messageContainer: {
        marginBottom: 10,
    },
    userMessage: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    aiMessage: {},
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'white', // Set input background color to white
    },
});

export default ChatComponent;
