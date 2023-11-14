// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/jobpage.css'; // Import the CSS file

// Define the functional component StudentInternshipDetails
const StudentInternshipDetails = () => {
  // Get the internship ID from the URL parameters
  const { id } = useParams();

  // State variables for the current internship and all internships
  const [internship, setInternship] = useState(null);
  const [allInternships, setAllInternships] = useState([]);

  // Use useEffect to fetch data when the component mounts or when the ID changes
  useEffect(() => {
    // Function to fetch all internships from the backend
    const fetchAllInternships = async () => {
      try {
        const response = await fetch('http://localhost:4444/internships');
        if (response.ok) {
          const data = await response.json();
          setAllInternships(data.internships);
        } else {
          console.error('Failed to fetch all internships');
        }
      } catch (error) {
        console.error('Error fetching all internships:', error.message);
      }
    };

    // Function to fetch details for a specific internship if ID is present
    if (id) {
      const fetchInternshipDetails = async () => {
        try {
          const response = await fetch(`http://localhost:4444/internships/${id}`);
          if (response.ok) {
            const data = await response.json();
            setInternship(data.internship);
          } else {
            console.error('Failed to fetch internship details');
          }
        } catch (error) {
          console.error('Error fetching internship details:', error.message);
        }
      };

      fetchInternshipDetails();
    }

    // Fetch all internships
    fetchAllInternships();
  }, [id]);

  // If an ID is present but internship details are not loaded yet, show a loading message
  if (id && !internship) {
    return <div>Loading internship details...</div>;
  }

  // Render the JSX structure of the component
  return (
    <div className="homedetailsofstudent">
      {id && (
        <div className="internship-detailsofstudents">
          <h4>{internship.internshipTitle}</h4>
          {/* Render other internship details here */}
        </div>
      )}

      <div className="all-internshipsofstudents">
        <h2>All Internships</h2>
        <div className="internship-cardsofstudents">
          {allInternships.map((internship) => (
            <div key={internship._id} className="internship-cardofstudents">
              <h3>{internship.internshipTitle}</h3>
              <p><strong>Internship Type:</strong> {internship.internshipType}</p>
              <p><strong>Description:</strong> {internship.internshipDescription}</p>
              <p><strong>Company:</strong> {internship.companyName}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Skills:</strong> {internship.skillsRequired.join(', ')}</p>

              {/* Apply Now button */}
              <a href={internship.companyURL} target="_blank" rel="noopener noreferrer" className="apply-button">
                Apply Now!
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export the component as the default export
export default StudentInternshipDetails;
