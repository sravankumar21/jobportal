import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
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
              <a href="#home">Home</a>
            </li>
            <li>
              <Link to="/student/roadmap">Roadmaps</Link>
            </li>
            <li>
              <Link to="/student/studentinternpage">View Internships</Link>
            </li>
            <li>
              <Link to="/student/studentjobpage">View Jobs</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </div>
      </header>
      <section className="homes" id="homes">
        <div className="wrapper">
          <div className="box">
            <div className="contents">
              <h3>WELCOME STUDENT!</h3>
              <p>
                "Welcome to the Student Dashboard of Career Opportunities. Explore and plan your academic journey with the CBIT Placement Cell."
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default StudentDashboard;
