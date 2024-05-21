import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Clipboard } from 'react-native';
import { TouchableOpacity } from 'react-native';


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
    const renderMessage = (message, messageIndex) => {
        // Check if message contains code within triple backticks
        const codeRegex = /```([^`]+)```([\s\S]+)/g;
        const parts = message.split(codeRegex);
    
        const handleCopy = (code) => {
            Clipboard.setString(code);
        };
    
        return (
            <View key={`message_${messageIndex}`} style={styles.messageContainer}>
                {parts.map((part, idx) => {
                    if (idx % 3 === 0) {
                        // Regular text
                        return (
                            <Text key={`part_${idx}`} style={styles.aiMessage}>
                                {part}
                            </Text>
                        );
                    } else if (idx % 3 === 1) {
                        // Language
                        return (
                            <Text key={`part_${idx}`} style={styles.languageMessage}>
                                {part}
                            </Text>
                        );
                    } else {
                        // Code block
                        return (
                            <View key={`part_${idx}`} style={styles.codeContainer}>
                                <Text style={styles.codeMessage}>
                                    {part}
                                </Text>
                                <TouchableOpacity onPress={() => handleCopy(part)}>
                                    <Text style={styles.copyButton}>Copy</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }
                })}
            </View>
        );
    };
    

    
    
    
    

    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Chat with Assistant</Text>
            <ScrollView style={styles.conversationContainer} ref={conversationContainerRef}>
                {conversation.map((message, index) => (
                    renderMessage(message.ai, index) // Call renderMessage for each AI message
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
    codeContainer: {
        backgroundColor: '#f0f0f0', // Set background color for code block
        borderRadius: 5,
        padding: 5,
    },
    
    codeMessage: {
        color: 'blue', // Set text color for code block
    },
    languageMessage: {
        fontStyle: 'italic', // Set italic font style for language
        color: 'gray', // Set color for language
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
