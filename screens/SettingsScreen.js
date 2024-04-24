import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            // Get the email from session storage
            const storedEmail = sessionStorage.getItem('email');

            // Check if email is available
            if (!storedEmail) {
                setError('Email not provided');
                return;
            }

            // Fetch settings data with the email
            const response = await axios.post('http://localhost:8000/settings_data', { email: storedEmail });
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

    const handleLogout = () => {
        // Clear session storage
        sessionStorage.removeItem('email');
        // Redirect to login screen
        navigation.navigate('SignIn');
    };

    return (
        <div>
            <h1>Settings</h1>
            {error && <p>{error}</p>}
            <p>Email: {email}</p>
            <p>Username: {username}</p>
            <p>AI Name: {aiName}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default SettingsScreen;
