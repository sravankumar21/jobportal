// AdminLogin.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../otherstyles/admin.css'; // Import styles
import image from '../images/admin.webp'; // Import image

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // Create a history object

  const apiUrl = 'http://localhost:4444';

const handleLogin = async () => {
  try {
    const response = await fetch(`${apiUrl}/admins/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role.role); // Store role in localStorage
        history.push('/admin/dashboard');
      } else {
        const errorText = await response.text();
        console.error('Login failed:', errorText);
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (error) {
      console.error('Unexpected error during login:', error);
      setError('An unexpected error occurred during login.');
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
          <h1>Admin Login</h1>
        </div>
      </div>

      {/* Input field for username */}
      <input
        type="text"
        id="username"
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
