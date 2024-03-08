import React, { useState } from 'react';

const Comment = () => {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [response, setResponse] = useState('');

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    comment: comment,
                }),
            });
            const data = await response.json();
            // Process response data (if needed)
            setResponse(data); // Assuming your Flask backend responds with some data
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="Login">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => handleInputChange(e, setUsername)}
                className='inputUsername'
            />
            <input
                type="text"
                placeholder="Comment"
                value={comment}
                onChange={(e) => handleInputChange(e, setComment)}
                className='inputComment'
            />
            <button onClick={handleSubmit} className="loginButton">Submit</button>
            <h3>{response.message}</h3>
        </div>
    );
};

export default Comment;
