// Import necessary dependencies
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from React Router
import '../otherstyles/admin.css'; // Import styles
import image from '../images/admin.webp'; // Import image

// Define the functional component Admin
export default function Admin() {
  // State variables for username, password, action, error, and history
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('AdminLogin');
  const [error, setError] = useState('');
  const history = useHistory(); // Create a history object

  const apiUrl = 'http://localhost:4444'; // Set your API base URL here

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        history.push(`${apiUrl}/admin/dashboard`);
      } else {
        // Display more meaningful error message based on response status
        if (response.status === 401) {
          setError('Invalid username or password');
        } else {
          setError('An error occurred during login: ' + response.statusText);
        }
        
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setError('An unexpected error occurred');
    }
  };

  // Return the JSX structure of the component
  return (
    <div className="container">
      <div className="heading">
        <div className="image">
          {/* Display the admin image */}
          <img src={image} alt="Some Description" />
          {/* Display the current action */}
          <h1>{action}</h1>
        </div>
      </div>

      {/* Input field for username */}
      <input
        type="text"
        id="username"
        className="input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Input field for password */}
      <input
        type="password"
        id="password"
        className="input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Display error message if there is an error */}
      {error && <div className="error-message">{error}</div>}

      {/* Button to trigger the login function */}
      <div className="submit">
        <div onClick={handleLogin}>Login</div>
      </div>
    </div>
  );
}
