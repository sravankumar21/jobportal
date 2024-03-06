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
              <a href="#contact">Qualifications</a>
            </li>
            <li>
            <a href="#contact">About</a>
            </li>
            <li>
            <a href="#contact">Contact</a>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
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
              <h2 className="responsive-heading">WELCOME TO ADMIN PAGE</h2>


              
              
            

          
          {/* Cards section */}
          <div className="cards">
            <div className="card">
              <h4>Add a New Student</h4>
              <p>Click below to add a new student.</p>
              <Link to="/admin/add-user">Add a New Student</Link>
            </div>

            <div className="card">
              <h4>Add a Job</h4>
              <p>Click below to add a new job.</p>
              <Link to="/admin/jobpage">Add New Job</Link>
            </div>

            <div className="card">
              <h4>Add an Internship</h4>
              <p>Click below to add a new internship.</p>
              <Link to="/admin/internpage">Add New Internship</Link>
            </div>

            <div className="card">
              <h4>Skill Development Center</h4>
              <p>Manage the Skills.</p>
              <Link to="/admin/skillspage">Add New Skill</Link>
            </div>
          </div>
          </div>
          </div>
        </div>
      </section>
    </div>
    
  );
};

export default AdminDashboard;