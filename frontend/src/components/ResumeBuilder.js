import React from "react";
import '../styles/resume.css';
import resume1 from '../images/resume.jpeg';

const ResumeBuilder = () => {
  return (
    <div>
      <section className="resumesection">
        <h1>SAMPLE RESUMES OF OUR TOP ACHIEVERS FOR YOUR REFERENCE</h1>
      </section>
      <div className="resume-container">
        <div className="resume-image">
          <img src={resume1} alt="Resume 1" />
        </div>
        <div className="resume-image">
          <img src={resume1} alt="Resume 2" />
        </div>
        <div className="resume-image">
          <img src={resume1} alt="Resume 3" />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
