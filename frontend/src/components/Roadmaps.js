import React from "react";
import '../styles/resume.css'; // Import the CSS file
import roadmap1 from '../images/fsdroadmap.jpeg';
import roadmap2 from '../images/devroad.jpeg';
import roadmap3 from '../images/javaroad.jpeg';

const Roadmaps = () => {
  return (
    <div>
      <section className="roadmap-section">
        <h1>ROADMAPS FOR YOUR JOURNEY</h1>
      </section>
      <div className="roadmap-container">
        <div className="roadmap-image">
          <img src={roadmap1} alt="Roadmap 1" />
        </div>
        <div className="roadmap-image">
          <img src={roadmap2} alt="Roadmap 2" />
        </div>
        <div className="roadmap-image">
          <img src={roadmap3} alt="Roadmap 3" />
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;
