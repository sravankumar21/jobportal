// StudentJobDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/jobpage.css'; // Import the new CSS file

const StudentJobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    // Fetch all jobs from the backend
    const fetchAllJobs = async () => {
      try {
        const response = await fetch('http://localhost:4444/jobs');
        if (response.ok) {
          const data = await response.json();
          setAllJobs(data.jobs);
        } else {
          console.error('Failed to fetch all jobs');
        }
      } catch (error) {
        console.error('Error fetching all jobs:', error.message);
      }
    };

    // If an ID is specified, fetch details for that specific job
    if (id) {
      const fetchJobDetails = async () => {
        try {
          const response = await fetch(`http://localhost:4444/jobs/${id}`);
          if (response.ok) {
            const data = await response.json();
            setJob(data.job);
          } else {
            console.error('Failed to fetch job details');
          }
        } catch (error) {
          console.error('Error fetching job details:', error.message);
        }
      };

      fetchJobDetails();
    }

    // Fetch all jobs
    fetchAllJobs();
  }, [id]);


  if (id && !job) {
    return <div>Loading job details...</div>;
  }
  return (
    <div className="homedetailsofjobs">
      {id && (
        <div className="job-detailsofstudents">
          <h4>{job.jobTitle}</h4>
        </div>
      )}

      <div className="all-jobsofstudents">
        <h2>All Jobs</h2>
        <div className="job-cardsofstudents">
          {allJobs.map((job) => (
            <div key={job._id} className="job-cardofstudents">
              <h3>{job.jobTitle}</h3>
              <p><strong>Job Type:</strong> {job.jobType}</p>
              <p><strong>Description:</strong> {job.jobDescription}</p>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Work Type:</strong> {job.workType}</p>
              <p><strong>Pay Scale:</strong> {job.payScale}</p>
              <p><strong>Skills:</strong> {job.skills.join(', ')}</p>

              <a href={job.companyURL} target="_blank" rel="noopener noreferrer" className="apply-button1">
                Apply Now!
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentJobDetails;
