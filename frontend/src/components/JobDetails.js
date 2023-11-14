import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/jobpage.css'; // Import the CSS file

const JobDetails = () => {
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

  // Function to handle update
  const handleUpdate = async (jobId) => {
    try {
      // Fetch the job details for the given ID
      const response = await fetch(`http://localhost:4444/jobs/${jobId}`);
      if (response.ok) {
        const data = await response.json();
        // Perform your update logic with the job data
        console.log('Update Job:', data);
      } else {
        console.error('Failed to fetch job details for update');
      }
    } catch (error) {
      console.error('Error updating job:', error.message);
    }
  };

  // Function to handle delete
  const handleDelete = async (jobId) => {
    try {
      // Perform the delete operation for the given job ID
      const response = await fetch(`http://localhost:4444/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle success, e.g., remove the deleted job from the state
        setAllJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        console.log('Job deleted successfully');
      } else {
        console.error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error.message);
    }
  };

  if (id && !job) {
    return <div>Loading job details...</div>;
  }
  return (
    <div className="homedetail">
      {id && (
        <div className="job-details">
          <h4>{job.jobTitle}</h4>
          {/* Render other job details here */}
        </div>
      )}

      <div className="all-jobs">
        <h2>All Jobs</h2>
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Job Type</th>
              <th>Job Description</th>
              <th>Company Name</th>
              <th>Company URL</th>
              <th>Work Type</th>
              <th>Pay Scale</th>
              <th>Skills</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allJobs.map((job) => (
              <tr key={job._id}>
                <td>{job.jobTitle}</td>
                <td>{job.jobType}</td>
                <td>{job.jobDescription}</td>
                <td>{job.companyName}</td>
                <td>{job.companyURL}</td>
                <td>{job.workType}</td>
                <td>{job.payScale}</td>
                <td>{job.skills.join(', ')}</td>
                <td>
                  <span
                    role="img"
                    aria-label="Update"
                    style={{
                      cursor: 'pointer',
                      marginBottom: '3.5px',
                      borderRadius: '40%',
                      backgroundColor: '#e0e0e0',
                      fontSize: '20px', // Adjust the font size as needed
                    }}
                    onClick={() => handleUpdate(job._id)}
                  >
                    ✏️
                  </span>
                  <span
                    role="img"
                    aria-label="Delete"
                    style={{
                      cursor: 'pointer',
                      marginBottom: '3.5px',
                      borderRadius: '40%',
                      backgroundColor: '#e0e0e0',
                      fontSize: '20px', // Adjust the font size as needed
                    }}
                    onClick={() => handleDelete(job._id)}
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobDetails;
