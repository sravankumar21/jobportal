import React, { useState } from 'react';
import axios from 'axios';
import '../styles/userform.css'; // Import the CSS file

const UserForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { username, password };

      // Make a POST request to your backend to create a new user
      const response = await axios.post('http://localhost:4444/users/add-student', newUser);

      // Handle the response as needed
      if (response.status === 201) {
        console.log('User registered successfully.');
      } else {
        console.error('User registration failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }         

    // Clear the input fields
    setUsername('');
    setPassword('');
  };

  return (
    <div className="contain">
      <div className="heading">
        <h1>Add a Student</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username" className="form-label"></label>
          <input
            type="text"
            id="username"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password" className="form-label"></label>
          <input
            type="password"
            id="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="click-button">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
