// InternshipDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/jobpage.css'; // Import the CSS file

const InternshipDetails = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [allInternships, setAllInternships] = useState([]);

  useEffect(() => {
    // Fetch all internships from the backend
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

    // If an ID is specified, fetch details for that specific internship
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

  if (id && !internship) {
    return <div>Loading internship details...</div>;
  }

  return (
    <div className="homedetail">
      {id && (
        <div className="internship-details">
          <h4>{internship.internshipTitle}</h4>
          {/* Render other internship details here */}
        </div>
      )}

      <div className="all-internships">
        <h2>All Internships</h2>
        <table>
          <thead>
            <tr>
              <th>Internship Title</th>
              <th>Internship Type</th>
              <th>Internship Description</th>
              <th>Company Name</th>
              <th>Company URL</th>
              <th>Duration</th>
              <th>Skills</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allInternships.map((internship) => (
              <tr key={internship._id}>
                <td>{internship.internshipTitle}</td>
                <td>{internship.internshipType}</td>
                <td>{internship.internshipDescription}</td>
                <td>{internship.companyName}</td>
                <td>{internship.companyURL}</td>
                <td>{internship.duration}</td>
                <td>{internship.skillsRequired.join(', ')}</td>
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
                    onClick={() => handleUpdate(internship._id)}
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
                    onClick={() => handleDelete(internship._id)}
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

export default InternshipDetails;
