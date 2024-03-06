import React, { useState, useEffect } from 'react';
import '../styles/skillForm.css'; // Import the new CSS file

const SkillDevelopmentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseinstructor: '',
    courselink: '',
    coursetype: '',
  });

  useEffect(() => {
    // If you need to perform any additional logic on component mount, you can do it here.
    // This block will run only once when the component mounts.
  }, []);

  const handleResponse = async (response) => {
    if (response.ok) {
      // Fetch updated skill development data if needed
      const allSkillDevelopmentsResponse = await fetch('http://localhost:4444/skill-development');
      if (allSkillDevelopmentsResponse.ok) {
        const data = await allSkillDevelopmentsResponse.json();
        console.log('Updated Skill Developments:', data.skillDevelopments);
      } else {
        console.error('Failed to fetch all skill developments');
      }

      setFormData({
        title: '',
        description: '',
        courseinstructor: '',
        courselink: '',
        coursetype: '',
      });

      // Show an alert upon successful addition
      alert('Skill Development content added successfully');

      console.log('Skill Development content added successfully');
    } else {
      console.error('Failed to add skill development content');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assume you are always adding (not updating) in this case
      const response = await fetch('http://localhost:4444/skill-development/add-skill-development', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      handleResponse(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="center-form">
      <div className="skill-form">
        <h1>Add New Skill Development Content</h1>
        <form className="create-skill-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div className="form-group">
            <label>Course Instructor:</label>
            <input
              type="text"
              value={formData.courseinstructor}
              onChange={(e) => setFormData({ ...formData, courseinstructor: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Course Link:</label>
            <input
              type="text"
              className="input-field"
              value={formData.courselink}
              onChange={(e) => setFormData({ ...formData, courselink: e.target.value })}
              placeholder="(e.g., Course Title: Link)"
              required
            />
          </div>

          <div className="form-group">
            <label>Course Type:</label>
            <input
              type="text"
              value={formData.coursetype}
              onChange={(e) => setFormData({ ...formData, coursetype: e.target.value })}
            />
          </div>

          <button type="submit">Add Skill Development Content</button>
        </form>
      </div>
    </div>
  );
};

export default SkillDevelopmentForm;
