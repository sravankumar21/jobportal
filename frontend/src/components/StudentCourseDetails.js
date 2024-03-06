// StudentSkillDevelopment.js

import React, { useState, useEffect } from 'react';
import '../styles/skillForm.css';

const StudentSkillDevelopment = () => {
  const [allSkillDevelopments, setAllSkillDevelopments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('All'); 

  useEffect(() => {
    const fetchSkillDevelopments = async () => {
      try {
        const response = await fetch('http://localhost:4444/skill-development');
        if (response.ok) {
          const data = await response.json();
          setAllSkillDevelopments(data.skillDevelopments);
        } else {
          console.error('Failed to fetch skill developments');
        }
      } catch (error) {
        console.error('Error fetching skill developments:', error.message);
      }
    };

    fetchSkillDevelopments();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  const filteredSkillDevelopments = allSkillDevelopments.filter((skillDevelopment) => {
    return (
      skillDevelopment.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterOption === 'All' || skillDevelopment.coursetype.toLowerCase() === filterOption.toLowerCase())
    );
  });
  

  return (
    <div className="homedetailsofstudent">
      <div className="all-skilldevelopmentsofstudents">
        <h1>Skill Developments Courses</h1>

        {/* Search bar */}
        <div className="search-container1">
          <div className="search-bar1">
            <p><strong>Search Here:</strong></p>
            <input
              type="text"
              placeholder="Search by Course Title"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Filter buttons */}
        <div className="filter-container1">
          <h4>Filter by:</h4>
          {['All', 'Free', 'Paid'].map((option) => (
            <button
              key={option}
              className={`filter-button1 ${filterOption === option ? 'selecteds' : ''}`}
              onClick={() => handleFilterChange(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* List of skill developments */}
        <div className="skilldevelopment-cardsofstudents">
          {filteredSkillDevelopments.map((skillDevelopment) => (
            <div key={skillDevelopment._id} className="skilldevelopment-cardofstudents">
              <h3>{skillDevelopment.title}</h3>
              <p><strong>Description:</strong> {skillDevelopment.description}</p>
              <p><strong>Course Instructor:</strong> {skillDevelopment.courseinstructor}</p>
              <a href={skillDevelopment.courselink} target="_blank" rel="noopener noreferrer">
  <button className="filter-button1">GO TO COURSE</button>
</a>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentSkillDevelopment;
