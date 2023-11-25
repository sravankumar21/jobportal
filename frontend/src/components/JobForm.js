import React, { useState } from 'react';
import { useJobContext } from '../hooks/JobContext'; // Update the path
import '../styles/jobpage.css';

const JobForm = () => {
  const { setAllJobs } = useJobContext();
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyURL, setCompanyURL] = useState('');
  const [workType, setWorkType] = useState('');
  const [payScale, setPayScale] = useState('');
  const [branchesEligible, setSkills] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const job = {
      jobTitle,
      jobType,
      jobDescription,
      companyName,
      companyURL,
      workType,
      payScale,
      branchesEligible: branchesEligible.split(',').map((branch) => branch.trim()),
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
        const allJobsResponse = await fetch('http://localhost:4444/jobs');
        if (allJobsResponse.ok) {
          const data = await allJobsResponse.json();
          setAllJobs(data.jobs);
        } else {
          console.error('Failed to fetch all jobs');
        }

        console.log('Job created successfully');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error('Error creating job:', error);
      setError('An error occurred while creating the job.');
    }
  };

  return (
    <div className="containedjob">
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
            <label>Eligible Branches</label>
            <input
              type="text"
              className="input-field"
              value={branchesEligible}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., CSE, ECE, AIDS)"
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
