import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useInternshipContext } from '../hooks/InternshipContext';
import InternshipForm from './InternshipForm'

const InternshipDetails = () => {
  const { id } = useParams();
  const { internship, setInternship, allInternships, setAllInternships,isEditing,setIsEditing } = useInternshipContext();
  console.log(isEditing)
  const [formData, setFormData] = useState({
    internshipTitle: '',
    internshipType: '',
    internshipDescription: '',
    companyName: '',
    companyURL: '',
    duration: '',
    branchesEligible: '',
    // isEditing:false
  });
  const history = useHistory();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch('http://localhost:4444/internships');
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setAllInternships(data.internships);
        } else {
          console.error('Failed to fetch all internships');
        }
      } catch (error) {
        console.error('Error fetching all internships:', error.message);
      }
    };

    fetchInternships();

    if (id) {
      const currentInternship = allInternships.find((internship) => internship._id === id);
      setInternship(currentInternship);
      console.log(currentInternship)
      setFormData({
        internshipTitle: currentInternship.internshipTitle,
        internshipType: currentInternship.internshipType,
        internshipDescription: currentInternship.internshipDescription,
        companyName: currentInternship.companyName,
        companyURL: currentInternship.companyURL,
        duration: currentInternship.duration,
        branchesEligible: currentInternship.branchesEligible.join(', '),
        
      });
    }
  }, [id, setInternship, setAllInternships]);
  const handleEditClick=()=>{
    setIsEditing(true);
    
  }

  const handleUpdate = async (internshipId) => {
    setIsEditing(true);
    
;
    try {
      const response = await fetch(`http://localhost:4444/internships/update-internship/${internshipId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          internshipTitle: formData.internshipTitle,
          internshipType: formData.internshipType,
          internshipDescription: formData.internshipDescription,
          companyName: formData.companyName,
          companyURL: formData.companyURL,
          duration: formData.duration,
          branchesEligible: formData.branchesEligible.split(',').map(branch => branch.trim()),
          
        }),
      });

      if (response.ok) {
        const updatedInternship = await response.json();
        console.log(updatedInternship)
        
        history.push('/admin/internpage');
        setInternship(updatedInternship);
      } else {
        console.error('Failed to update internship:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating internship:', error.message);
    }
  };

  const handleDelete = async (internshipId) => {
    try {
      const response = await fetch(`http://localhost:4444/internships/${internshipId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAllInternships((prevInternships) =>
          prevInternships.filter((internship) => internship._id !== internshipId)
        );
        console.log('Internship deleted successfully');
      } else {
        console.error('Failed to delete internship');
      }
    } catch (error) {
      console.error('Error deleting internship:', error.message);
    }
  };

  if (id && !internship) {
    return <div>Loading internship details...</div>;
  }

  return (
    <div className="homedetails">
      {id && (
        <div className="internship-details">
          {isEditing ? (
            <InternshipForm isEditing={isEditing} setIsEditing={setIsEditing} initialFormData={formData} />
          ) : (
            <div>
              <h4>{internship.internshipTitle}</h4>
              {/* Render other internship details here */}
            </div>
          )}
          <button onClick={isEditing ? () => handleUpdate(internship._id) : handleEditClick}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      )}

      <div className="all-internships">
        <h2>All Internships</h2>
        <div className="internship-cards">
          {allInternships.map((internship) => (
            <div key={internship._id} className="internship-card">
              <h3>{internship.internshipTitle}</h3>
              <p><strong>Internship Type:</strong> {internship.internshipType}</p>
              <p><strong>Description:</strong> {internship.internshipDescription}</p>
              <p><strong>Company:</strong> {internship.companyName}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Eligible branches:</strong> {internship.branchesEligible.join(', ')}</p>

              <div className="action-buttons">
                <span
                  role="img"
                  aria-label="Update"
                  onClick={() => handleUpdate(internship._id)}
                >
                  ✏️
                </span>
                <span
                  role="img"
                  aria-label="Delete"
                  onClick={() => handleDelete(internship._id)}
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

export default InternshipDetails;
