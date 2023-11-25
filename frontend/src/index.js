// index.js or another high-level component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { InternshipProvider } from './hooks/InternshipContext';
import { JobProvider } from './hooks/JobContext';

ReactDOM.render(
  <React.StrictMode>
    <InternshipProvider>
      <JobProvider>
        <App />
      </JobProvider>
    </InternshipProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
