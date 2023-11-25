// InternshipContext.js
import React, { createContext, useContext, useState } from 'react';

const InternshipContext = createContext();

export const InternshipProvider = ({ children }) => {
  const [allInternships, setAllInternships] = useState([]);
  const [internship, setInternship] = useState(null);

  const contextValue = {
    allInternships,
    setAllInternships,
    internship,
    setInternship,
  };

  return (
    <InternshipContext.Provider value={contextValue}>
      {children}
    </InternshipContext.Provider>
  );
};

export const useInternshipContext = () => {
  const context = useContext(InternshipContext);
  if (!context) {
    throw new Error('useInternshipContext must be used within an InternshipProvider');
  }
  return context;
};
