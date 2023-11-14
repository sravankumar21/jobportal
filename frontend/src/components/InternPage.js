import React from 'react';
import InternshipForm from './InternshipForm'; // Import your JobForm component
import InternshipDetails from './InternshipDetails'; // Import your JobDetails component

const InternPage = () => {
  return (
    <div className="page-wrapper">
      <InternshipForm/>
      <InternshipDetails />
    </div>
  );
};

export default InternPage;
