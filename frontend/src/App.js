// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StudentLogin from './components/StudentLogin';
import AdminLogin from './components/AdminLogin';
import HomePage from './components/HomePage';
import ResumeBuilder from './components/ResumeBuilder';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import UserForm from './components/UserForm';
import AddInternship from './components/InternshipForm';
import AddJob from './components/JobForm';
import JobPage from './components/Jobpage';
import InternPage from './components/InternPage';
import StudentInternshipDetails from './components/Studentintdetails';
import StudentJobDetails from './components/studentjobdetails';
import Roadmaps from './components/Roadmaps';


function App() {
  return (
      <Router>
        <Switch>
          <Route path="/studentlogin" component={StudentLogin} />
          <Route path="/adminlogin" component={AdminLogin} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/student/dashboard" component={StudentDashboard} />
          <Route exact path="/" component={HomePage} />
          <Route path="/resumebuilder" component={ResumeBuilder} />
          <Route path="/student/roadmap" component={Roadmaps} />
          <Route path="/admin/add-user" component={UserForm} />
          <Route path="/admin/add-internship" component={AddInternship} />
          <Route path="/admin/add-job" component={AddJob} />
          <Route path="/admin/jobpage" component={JobPage} />
          <Route path="/admin/internpage" component={InternPage} />
          <Route exact path="/student/studentinternpage" component={StudentInternshipDetails} />
          <Route exact path="/student/studentjobpage" component={StudentJobDetails} />
        </Switch>
      </Router>
  );
}

export default App;
