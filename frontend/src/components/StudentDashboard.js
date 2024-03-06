import React from 'react';
import { Link } from 'react-router-dom';
import '../otherstyles/student.css';

const StudentDashboard = () => {
  return (
    <div>
      <header className="headers">
        <div className="left-navbar">
          <p className="nav-tit">CBIT - STUDENT DASHBOARD</p>
        </div>
        <div>
          <ul>
            <li>
              <Link to="/student/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/student/profile">Your Profile</Link>
            </li>
            <li>
              <Link to="/student/RegisteredCourses">Registered Courses</Link>
            </li>
            <li>
              <Link to="/student/Skills">Skills</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </header>

      
      {/* Cards section */}
      <div className="cards">
        
        <div className="card">
          <h4>View Roadmaps</h4>
          <p>Explore and manage your academic roadmaps.</p>
          <Link to="/student/roadmap">Explore Roadmaps</Link>
        </div>

        <div className="card">
          <h4>View Internships</h4>
          <p>View and apply for available internships.</p>
          <Link to="/student/studentinternpage">View Internships</Link>
        </div>

        <div className="card">
          <h4>View Jobs</h4>
          <p>Explore and apply for available job opportunities.</p>
          <Link to="/student/studentjobpage">View Jobs</Link>
        </div>

        <div className="card">
          <h4>Build your Skills</h4>
          <p>Go,find a course and learn it.</p>
          <Link to="/student/skillspage">View Profile</Link>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
