// InternshipForm.js
import React, { useState, useEffect } from 'react';
import { useInternshipContext } from '../hooks/InternshipContext'; // Update the path

const InternshipForm = () => {
  const { setAllInternships, internship, isEditing, setIsEditing } = useInternshipContext();
  console.log(internship)
  const [formData, setFormData] = useState({
    internshipTitle: '',
    internshipType: '',
    internshipDescription: '',
    companyName: '',
    companyURL: '',
    duration: '',
    branchesEligible: '',
  });

  useEffect(() => {
    if (isEditing && internship) {
      setFormData({
        internshipTitle: internship.internshipTitle,
        internshipType: internship.internshipType,
        internshipDescription: internship.internshipDescription,
        companyName: internship.companyName,
        companyURL: internship.companyURL,
        duration: internship.duration,
        branchesEligible: internship.branchesEligible.join(', '),
      });
    }
  }, [isEditing, internship]);

  const handleSkillsChange = (e) => {
    const branchesEligible = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, branchesEligible: branchesEligible.join(', ') });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const internshipData = {
      internshipTitle: formData.internshipTitle,
      internshipType: formData.internshipType,
      internshipDescription: formData.internshipDescription,
      companyName: formData.companyName,
      companyURL: formData.companyURL,
      duration: formData.duration,
      branchesEligible: formData.branchesEligible.split(',').map((branch) => branch.trim()),
    };

    try {
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:4444/internships/update-internship/${internship._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(internshipData),
        });
      } else {
        response = await fetch('http://localhost:4444/internships/add-internship', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(internshipData),
        });
      }

      if (response.ok) {
        const allInternshipsResponse = await fetch('http://localhost:4444/internships');
        if (allInternshipsResponse.ok) {
          const data = await allInternshipsResponse.json();
          setAllInternships(data.internships);
        } else {
          console.error('Failed to fetch all internships');
        }

        setFormData({
          internshipTitle: '',
          internshipType: '',
          internshipDescription: '',
          companyName: '',
          companyURL: '',
          duration: '',
          branchesEligible: '',
        });
        setIsEditing(false);

        console.log('Internship added or updated successfully');
      } else {
        console.error('Failed to add or update internship');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="contained">
      <div className="intern-form">
        <h1>{isEditing ? 'Update Internship' : 'Add a New Internship'}</h1>
        <form className="create" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Internship Title:</label>
              <input
                type="text"
                value={formData.internshipTitle}
                onChange={(e) => setFormData({ ...formData, internshipTitle: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Internship Type:</label>
              <input
                type="text"
                value={formData.internshipType}
                onChange={(e) => setFormData({ ...formData, internshipType: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Internship Description:</label>
              <textarea
                value={formData.internshipDescription}
                onChange={(e) => setFormData({ ...formData, internshipDescription: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Company Name:</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Company URL:</label>
              <input
                type="text"
                value={formData.companyURL}
                onChange={(e) => setFormData({ ...formData, companyURL: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Duration:</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Eligible Branches:</label>
            <input
              type="text"
              className="input-field"
              value={formData.branchesEligible}
              onChange={(e) => setFormData({ ...formData, branchesEligible: e.target.value })}
              placeholder="(e.g., CSE, ECE, AIDS)"
              required
            />
          </div>

          <button type="submit">{isEditing ? 'Update Internship' : 'Add Internship'}</button>
        </form>
      </div>
    </div>
  );
};

export default InternshipForm;