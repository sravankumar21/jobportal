// JobContext.js
import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [allJobs, setAllJobs] = useState([]);
  const [job, setJob] = useState(null);

  const contextValue = {
    allJobs,
    setAllJobs,
    job,
    setJob,
  };

  return <JobContext.Provider value={contextValue}>{children}</JobContext.Provider>;
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};
