// InternshipForm.js
import React, { useState } from 'react';
import '../styles/jobpage.css'; // Import the CSS file

const InternshipForm = () => {
  const [internshipTitle, setInternshipTitle] = useState('');
  const [internshipType, setInternshipType] = useState('');
  const [internshipDescription, setInternshipDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyURL, setCompanyURL] = useState('');
  const [duration, setDuration] = useState('');
  const [skillsRequired, setSkillsRequired] = useState([]);

  const handleSkillsChange = (e) => {
    // Convert the selected skills to an array
    const selectedSkills = Array.from(e.target.selectedOptions, (option) => option.value);
    setSkillsRequired(selectedSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the internship data
    const internshipData = {
      internshipTitle,
      internshipType,
      internshipDescription,
      companyName,
      companyURL,
      duration,
      skillsRequired,
    };

    // Send a POST request to your backend API to add the internship
    try {
      const response = await fetch('http://localhost:4444/internships/add-internship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(internshipData),
      });

      if (response.status === 201) {
        // Internship added successfully
        // You can redirect or show a success message here
        console.log('Internship added successfully');
      } else {
        // Handle errors here
        console.error('Failed to add internship');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="contained">
      <div className="intern-form">
        <h1>Add a New Internship</h1>
        <form className="create" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Internship Title:</label>
            <input
              type="text"
              value={internshipTitle}
              onChange={(e) => setInternshipTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Internship Type:</label>
            <input
              type="text"
              value={internshipType}
              onChange={(e) => setInternshipType(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Internship Description:</label>
            <textarea
              value={internshipDescription}
              onChange={(e) => setInternshipDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Company URL:</label>
            <input
              type="text"
              value={companyURL}
              onChange={(e) => setCompanyURL(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Duration:</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Skills Required</label>
            <input
              type="text"
              className="input-field"
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
              placeholder="Separate skills with commas (e.g., HTML, CSS, JavaScript)"
              required
            />
          </div>

          <button>Add Internship</button>
        </form>
      </div>
    </div>
  );
};

export default InternshipForm;
