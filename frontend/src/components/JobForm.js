import React, { useState } from 'react';
import '../styles/jobpage.css'; // Import the CSS file

const JobForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyURL, setCompanyURL] = useState('');
  const [workType, setWorkType] = useState('');
  const [payScale, setPayScale] = useState('');
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the job object with form input values
    const job = {
      jobTitle,
      jobType,
      jobDescription,
      companyName,
      companyURL,
      workType,
      payScale,
      skills: skills.split(',').map((skill) => skill.trim()),
    };

    try {
      const response = await fetch('http://localhost:4444/jobs/add-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });

      if (response.status === 201) {
        // Successfully created the job
        // You can add any success handling here
        console.log('Job created successfully');
      } else {
        // Handle errors here
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error('Error creating job:', error);
      setError('An error occurred while creating the job.');
    }
  };

  return (
    <div className="contained">
      <div className="job-form">
        <h1>Add a New Job</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              className="input-field"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Job Type</label>
            <input
              type="text"
              className="input-field"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              className="input-field"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Company URL</label>
            <input
              type="text"
              className="input-field"
              value={companyURL}
              onChange={(e) => setCompanyURL(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Work Type</label>
            <input
              type="text"
              className="input-field"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Pay Scale</label>
            <input
              type="text"
              className="input-field"
              value={payScale}
              onChange={(e) => setPayScale(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Skills Required</label>
            <input
              type="text"
              className="input-field"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Separate skills with commas (e.g., HTML, CSS, JavaScript)"
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="submit-button">
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
