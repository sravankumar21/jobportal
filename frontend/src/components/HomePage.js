import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import StudentLogin from '../components/StudentLogin.js';
import AdminLogin from '../components/AdminLogin.js'; 
import '../styles/index1.css';
import jsPDF from 'jspdf';
import tick from '../images/placed.webp';
import college from '../images/college.jpeg';
import placementPDF from '../images/Year-Wise-Placements-2022-23.pdf';

const HomePage = () => {
  const downloadPdf = () => {
    // Open the PDF file in a new tab/window
    window.open(placementPDF);
 
  };

  return (
    <div>
      <header className="header">
        <div className="left-navbar">
        <p className="nav-title">CBIT - Placement Cell</p>
        </div>
    <div>
  <ul>
    <li>
      <a href="#home">Home</a>
    </li>
    <li>
      <a href="#placement-highlights">Highlights</a>
    </li>
    <li>
      <Link to="/resumebuilder" >Resume Builder </Link>
    </li>
    <li>
    <Link to="/studentlogin" className="btn">Student Login</Link>
    </li>
    <li>
      <a href="#about">About Us</a>
    </li>
  </ul>
</div>
      </header>
      <section className="home" id="home">
        <div className="wrapper">
        <div className="box">
  <div className="content">
  <img src={college} alt="College pic 2" />
    <h4>Get Hired!</h4>
   
    <Link to="/adminlogin" className="btnp">
      Post a Job or an Internship
      </Link>
  </div>
</div>
</div>
      </section>

      <section className="top-students">
      
        <div className="wrapper">
          <h2>CONGRATULATIONS TO OUR TOP ACHIEVERS!</h2>
          <div className="student-grid">
            <div className="student-box">
              <img src={tick} alt="Top Student 1" />
              <p>Name: Meghana Sreeya Veeramallu</p>
              <p>Branch: Computer Science</p>
              <p>Company: Atlassian</p>
              <p>Package: 59.91 LPA</p>
            </div>
            <div className="student-box">
              <img src={tick} alt="Top Student 2" />
              <p>Name: Sri Chakra Raj Pyaraka</p>
              <p>Branch: Information Technology</p>
              <p>Company: Electronic Arts</p>
              <p>Package: 44 LPA</p>
            </div>
            <div className="student-box">
              <img src={tick} alt="Top Student 3" />
              <p>Name: Nishanth Puppala</p>
              <p>Branch: Information Technology</p>
              <p>Company: Electronic Arts</p>
              <p>Package: 44 LPA</p>
            </div>
            <div className="student-box">
              <img src={tick} alt="Top Student 4" />
              <p>Name: Arshitha D</p>
              <p>Branch: Computer Engineering</p>
              <p>Company: Salesforce</p>
              <p>Package: 44.5 LPA</p>
            </div>
            <div className="student-box">
              <img src={tick} alt="Top Student 5" />
              <p>Name: Diverse Students</p>
              <p>Branch: Computer Engineering</p>
              <p>Company: Salesforce</p>
              <p>Package: 44.5 LPA</p>
            </div>
            <div className="explore-more">
            <button onClick={downloadPdf} className="btn2">
                Explore More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="recruiting-companies">
        <div className="wrapper">
          <h2>TOP RECRUITERS</h2>
          <div className="company-grid">
            <div className="company-box">ACCENTURE</div>
            <div className="company-box">AMAZON</div>
            <div className="company-box">ARCESIUM</div>
            <div className="company-box">BYJU'S</div>
            <div className="company-box">CAPGEMINI</div>
            <div className="company-box">COGNIZANT</div>
            <div className="company-box">DELOITTE</div>
            <div className="company-box">FORD</div>
            <div className="company-box">GOOGLE</div>
            <div className="company-box">HUAWEI</div>
            <div className="company-box">INFOSYS</div>
            <div className="company-box">ITC</div>
            <div className="company-box">JP MORGAN CHASE</div>
            <div className="company-box">MAHINDRA</div>
            <div className="company-box">ORACLE</div>
            <div className="company-box">SAMSUNG</div>
            <div className="company-box">SERVICENOW</div>
            <div className="company-box">TCS</div>
            <div className="company-box">UBER</div>
            <div className="company-box">WIPRO</div>
          </div>
        </div>
      </section>

      <section className="placement-highlights" id="placement-highlights">
        <div className="wrapper">
          <h2>2022-23 PLACEMENT HIGHLIGHTS</h2>
          <div className="highlight-boxes">
            <div className="stat-box">
              <p>138+ Companies</p>
            </div>
            <div className="stat-box">
              <p>1304 Placement Offers</p>
            </div>
            <div className="stat-box">
              <p>45.6L is the Highest Package</p>
            </div>
            <div className="stat-box">
              <p>83.68% Of Placements</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrapper">
          <h3>College Contact Information</h3>
          <p>Gandipet, Hyderabad, Telangana</p>
          <p>PIN: 500075</p>
          <p>Phone: 040-24193276</p>
          <p>Mobile: 8466997201</p>
          <p>For Admissions Enquiry: 8466997216</p>
          <p>Email: principal@cbit.ac.in</p>
        </div>
      </footer>
    </div>
  );
};
export default HomePage;
