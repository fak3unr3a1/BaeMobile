import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const BASE_URL = 'https://y4u5dmmbw7.eu-west-1.awsapprunner.com'; // Base URL
const BASE_URL = 'http://localhost:8000/';

function SettingsScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [aiName, setAiName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSettingsData();
    }, []);

    const fetchSettingsData = async () => {
        try {
            // Get the email from AsyncStorage
            const storedEmail = await AsyncStorage.getItem('email');

            // Check if email is available
            if (!storedEmail) {
                setError('Email not provided');
                return;
            }

            // Fetch settings data with the email
            const response = await axios.post(`${BASE_URL}/settings_data`, { email: storedEmail }); // Updated URL
            const data = response.data;
            if (data.error) {
                setError(data.error);
            } else {
                setEmail(data.email);
                setUsername(data.username);
                setAiName(data.ai_name);
            }
        } catch (error) {
            console.error('Error fetching settings data:', error);
            setError('Error fetching settings data');
        }
    };

    const handleLogout = async () => {
        try {
            // Clear AsyncStorage
            await AsyncStorage.removeItem('email');
            // Redirect to login screen
            navigation.navigate('SignIn');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <Text style={styles.text}>Email: {email}</Text>
            <Text style={styles.text}>Username: {username}</Text>
            <Text style={styles.text}>AI Name: {aiName}</Text>
            <Button title="Logout" onPress={handleLogout} style={styles.button} />
        </View>
    );
}

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
    text: {
        color: 'white',
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#0000ff',
    },
});

export default SettingsScreen;
