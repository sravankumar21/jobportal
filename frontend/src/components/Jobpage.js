import React from 'react';
import JobForm from './JobForm'; // Import your JobForm component
import JobDetails from './JobDetails'; // Import your JobDetails component

const JobPage = () => {
  return (
    <div className="page-wrapper">
      <JobForm />
      <JobDetails />
    </div>
  );
};

export default JobPage;
