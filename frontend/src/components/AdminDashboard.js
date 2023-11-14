import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import '../styles/index1.css';
import admin from '../images/admin.webp';

const AdminDashboard = () => {
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
              <Link to="/admin/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </header>
      <section className="home" id="home">
        <div className="wrapper">
          <div className="box">
            <div className="content">
              <img src={admin} alt="Admin pic" />
              <h3>WELCOME ADMIN!</h3>
              <p>
                "Welcome to the Admin Dashboard of Career Opportunities. Manage and elevate careers with the CBIT Placement Cell – where opportunities await your guidance."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
