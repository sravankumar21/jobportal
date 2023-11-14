import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Admin Dashboard</h1>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/add-job">Add Job</Link>
          </li>
          <li>
            <Link to="/add-internship">Add Internship</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
