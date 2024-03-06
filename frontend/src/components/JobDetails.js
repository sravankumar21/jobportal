import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useJobContext } from '../hooks/JobContext'; // Update the path

const JobDetails = () => {
  const { id } = useParams();
  const { job, setJob, allJobs, setAllJobs } = useJobContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all jobs
        const allJobsResponse = await fetch('http://localhost:4444/jobs');
        if (allJobsResponse.ok) {
          const allJobsData = await allJobsResponse.json();
          setAllJobs(allJobsData.jobs);
        } else {
          console.error('Failed to fetch all jobs');
        }

        // If an ID is specified, fetch details for that specific job
        if (id) {
          const jobResponse = await fetch(`http://localhost:4444/jobs/${id}`);
          if (jobResponse.ok) {
            const jobData = await jobResponse.json();
            setJob(jobData);
          } else {
            console.error('Failed to fetch job details');
          }
        }
      } catch (error) {
        console.error('Error fetching job data:', error.message);
      }
    };

    // Fetch data
    fetchData();
  }, [id, setJob, setAllJobs]);

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

  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:4444/jobs/delete-job/${jobId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion
        console.log('Job deleted successfully');
        // Optionally, you can update the local state to reflect the deletion
        setAllJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      } else {
        // Handle deletion failure
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
    <div>
      {id && (
        <div className="job-details-container">
          <h4 className="job-title">{job.jobTitle}</h4>
          {/* Render other job details here */}
        </div>
      )}

      <div className="all-jobs-container">
        <h2 className="all-jobs-title">All Jobs</h2>
        <div className="job-cards">
          {allJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.jobTitle}</h3>
              <p><strong>Job Type:</strong> {job.jobType}</p>
              <p><strong>Description:</strong> {job.jobDescription}</p>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Work Type:</strong> {job.workType}</p>
              <p><strong>Pay Scale:</strong> {job.payScale}</p>
              <p><strong>Eligible branches:</strong> {job.branchesEligible.join(', ')}</p>

              {/* Action buttons */}
              <div className="action-buttons">
                <span
                  className="update-button"
                  onClick={() => handleUpdate(job._id)}
                >
                  ✏️
                </span>
                <span
                  className="delete-button"
                  onClick={() => handleDelete(job._id)}
                >
                  🗑️
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;