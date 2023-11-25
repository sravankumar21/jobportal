import React from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory
import '../styles/index1.css';
import admin from '../images/admin.webp';

const AdminDashboard = () => {
  const history = useHistory(); // Initialize history

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4444/admins/logout', {
        method: 'GET',
        credentials: 'include', // Include credentials for cookie-based authentication
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear local storage or perform any necessary cleanup
        localStorage.clear();
        // Redirect to the home page
        history.push('/');
      } else {
        // Handle logout failure, e.g., display an error message
        console.error('Logout failed:', await response.text());
      }
    } catch (error) {
      console.error('An unexpected error occurred during logout:', error);
    }
  };

  return (
    <div>
      <header className="header">
        <div className="left-navbar">
          <p className="nav-titles">CBIT - ADMIN DASHBOARD</p>
        </div>
        <div>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <Link to="/admin/add-user">Add User</Link>
            </li>
            <li>
              <Link to="/admin/internpage">Add Internship</Link>
            </li>
            <li>
              <Link to="/admin/jobpage">Add Job</Link>
            </li>
            <li>
              <Link to="/">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <section className="home" id="home">
        <div className="wrapper">
          <div className="box">
            <div className="contents">
              {/* <img src={admin} alt="Admin pic" /> */}
              <h3>WELCOME ADMIN!</h3>
              <p>
                "Welcome to the Admin Dashboard of Career Opportunities. Manage and elevate careers with the CBIT Placement Cell."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
