// Import necessary dependencies
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../otherstyles/admin.css';
import image from '../images/student.webp';

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

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
        localStorage.setItem('role', data.role.role); // Extract the role from the server response
        history.push('/student/dashboard');
      } else {
        const errorText = await response.text();
        console.error('Login failed:', errorText);
        setErrorMessage('Invalid credentials. Please check your username and password.');
      }
    } catch (error) {
      console.error('Unexpected error during login:', error);
      setErrorMessage('An unexpected error occurred during login.');
    }
  };
  
  // Return the JSX structure of the component
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
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
