import React, { useState, useEffect, useRef } from 'react';

function ChatComponent() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [resultDestPath, setResultDestPath] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isSending, setIsSending] = useState(false); // State variable to track if a request is pending
    const conversationContainerRef = useRef(null);

    useEffect(() => {
        // Retrieve user's email from session storage upon component mount
        const email = sessionStorage.getItem('email');
        if (email) {
            setUserEmail(email);
        }
    }, []);

    useEffect(() => {
        // Scroll to the bottom of the conversation container whenever conversation updates
        conversationContainerRef.current.scrollTo(0, conversationContainerRef.current.scrollHeight);
    }, [conversation]);

    const handleChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            setIsSending(true); // Set isSending to true to indicate a request is being sent
            const response = await fetch('http://localhost:8000/get_response_react', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Email': userEmail, // Include user's email in the request headers
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
    
            // Add the user query and AI response to the conversation
            setConversation(prevConversation => [
                ...prevConversation,
                { user: userInput, ai: data.response }
            ]);
    
            setResponse(data.response);
            setResultDestPath(data.result_dest_path || '');
            setUserInput(''); // Clear user input field
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setIsSending(false); // Set isSending to false when request processing is complete
        }
    };
    

    return (
        <div>
            <h1>Chat with Assistant</h1>
            <div className="conversation-container" style={{ maxHeight: '300px', overflowY: 'auto' }} ref={conversationContainerRef}>
                {conversation.map((message, index) => (
                    <div key={index} className="message">
                        {message.user && <p><strong>User:</strong> {message.user}</p>}
                        <p><strong>AI:</strong> {message.ai}</p>
                    </div>
                ))}
                {/* Display the last user query while waiting for a response */}
                {userInput && (
                    <div className="message">
                        <p><strong>User:</strong> {userInput}</p>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={userInput} onChange={handleChange} disabled={isSending} /> {/* Disable input field when sending request */}
                <button type="submit" disabled={isSending}>Send</button> {/* Disable button when sending request */}
            </form>
            {response && (
                <div>
                    {/* <p>Assistant Response: {response}</p>
                    {resultDestPath && <p>Result Destination Path: {resultDestPath}</p>} */}
                </div>
            )}
        </div>
    );
}

export default ChatComponent;

