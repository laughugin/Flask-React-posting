import React, { useState, useEffect } from 'react';

const Posts = () => {
  // Initialize state to hold comments
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    // Function to fetch comments from the local API
    const fetchComments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/comments');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setComments(data); 
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchComments(); 
  }, []); 

  return (
    <div className='comments'>
      <h2>Comments</h2>
      <ol>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong style={{ color: '#ffffff' }}>{comment.username}:</strong> {comment.comment}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Posts;
