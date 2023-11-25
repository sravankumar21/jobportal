// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/jobpage.css';

const StudentJobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranches, setSelectedBranches] = useState(['ALL']);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBranchButtonClick = (branch) => {
    const newSelectedBranches = [...selectedBranches];

    if (newSelectedBranches.includes(branch)) {
      newSelectedBranches.splice(newSelectedBranches.indexOf(branch), 1);
    } else {
      newSelectedBranches.push(branch);
    }

    setSelectedBranches(newSelectedBranches);
  };

  // Filter jobs based on the search query and selected branches
  const filteredJobs = allJobs
    .filter(job =>
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(job => {
      const jobBranches = Array.isArray(job.branchesEligible)
        ? job.branchesEligible.map(branch => branch?.trim().toUpperCase().replace(/'/g, ''))
        : typeof job.branchesEligible === 'string'
        ? job.branchesEligible.split(',').map(branch => branch?.trim().toUpperCase().replace(/'/g, ''))
        : [];

      const includesSelectedBranch = selectedBranches.length > 0 && selectedBranches.some(branch => jobBranches.includes(branch.toUpperCase()));

      return selectedBranches.length === 1 && selectedBranches[0] !== 'ALL' ? includesSelectedBranch : true;
    });

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
        <h1>All Jobs</h1>

        {/* Search bar */}
        <div className="search-container">
          <div className="search-bar">
            <p><strong>Search Here:</strong></p>
            <input
              type="text"
              placeholder="Search by Company Name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Filter buttons */}
        <div className="filter-container">
          <h4>Filter by:</h4>
          {['ALL', 'CSE', 'CSM', 'AIDS', 'AIML', 'IT', 'CET', 'ECE', 'EEE', 'CIVIL', 'MECH', 'BIO-TECH', 'CHEM'].map((branch) => (
            <button
              key={branch}
              className={`filter-button ${selectedBranches.includes(branch) ? 'selected' : ''}`}
              onClick={() => handleBranchButtonClick(branch)}
            >
              {branch}
            </button>
          ))}
        </div>

        {/* List of jobs */}
        <div className="job-cardsofstudents">
          {filteredJobs.map((job) => (
            <div key={job._id} className="job-cardofstudents">
              <h3>{job.jobTitle}</h3>
              <p><strong>Job Type:</strong> {job.jobType}</p>
              <p><strong>Description:</strong> {job.jobDescription}</p>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Work Type:</strong> {job.workType}</p>
              <p><strong>Pay Scale:</strong> {job.payScale}</p>
              <p><strong>Eligible branches:</strong> {job.branchesEligible.join(', ')}</p>

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
