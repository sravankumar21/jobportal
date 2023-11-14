import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from React Router
import '../otherstyles/admin.css';
import image from '../images/student.webp';

export default function Student() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory(); // Get the history object

  const handleLogin = async () => {
    // Make an API request to the server to authenticate the student
    try {
      const response = await fetch('/api/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        // Authentication successful
        history.push('/student/dashboard'); // Redirect to the student dashboard
      } else {
        // Authentication failed
        setErrorMessage('Username or password is incorrect');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login');
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <div className="image">
          <img src={image} alt="Student" />
          <h1>Student Login</h1>
        </div>
      </div>

      <input
        type="text"
        id="username"
        className="input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        id="password"
        className="input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="submit">
        <div className="button" onClick={handleLogin}>
          Login
        </div>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}
