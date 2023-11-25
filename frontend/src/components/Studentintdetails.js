// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/jobpage.css';

// Define the main component
const StudentInternshipDetails = () => {
  // Get the internship ID from the URL
  const { id } = useParams();

  // State to store the details of a specific internship
  const [internship, setInternship] = useState(null);

  // State to store all internships
  const [allInternships, setAllInternships] = useState([]);

  // State to store selected branches for filtering
  const [selectedBranches, setSelectedBranches] = useState(['ALL']);

  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  // State to store internships filtered by search query
  const [filteredInternshipsBySearch, setFilteredInternshipsBySearch] = useState([]);

  // Fetch all internships and details of a specific internship on component mount
  useEffect(() => {
    // Fetch all internships
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

    // Fetch details of a specific internship if ID is provided
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

    // Execute the fetch functions
    if (id) {
      fetchInternshipDetails();
    }
    
    fetchAllInternships();
  }, [id]);

  // Update filteredInternshipsBySearch when the search query changes
  useEffect(() => {
    const filteredInternships = allInternships.filter((internship) => {
      return internship.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredInternshipsBySearch(filteredInternships);
  }, [searchQuery, allInternships]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle branch filter button click
  const handleBranchButtonClick = (branch) => {
    const newSelectedBranches = [...selectedBranches];

    if (newSelectedBranches.includes(branch)) {
      newSelectedBranches.splice(newSelectedBranches.indexOf(branch), 1);
    } else {
      newSelectedBranches.push(branch);
    }

    setSelectedBranches(newSelectedBranches);
  };


  const filteredInternshipsByBranch = filteredInternshipsBySearch.filter((internship) => {
    if (!internship.branchesEligible) {
      console.log('Skipping internship without branchesEligible:', internship);
      return false; // Skip internships without branchesEligible
    }
  
    const internshipBranches = Array.isArray(internship.branchesEligible)
      ? internship.branchesEligible.map(branch => branch?.trim().toUpperCase().replace(/'/g, '').split(','))
      : typeof internship.branchesEligible === 'string'
      ? internship.branchesEligible.split(',').map(branch => branch?.trim().toUpperCase().replace(/'/g, ''))
      : [];
  
    // Flatten the nested arrays and remove single quotes
// Flatten the nested arrays and remove single quotes, trim branch names
const flattenedBranches = [].concat(...internshipBranches).map(branch => branch.trim().replace(/'/g, ''));

  
    console.log('Internship Branches:', flattenedBranches);
  
    // Check if selectedBranches is not empty and if any of the selected branches is included in the internship branches
    const includesSelectedBranch = selectedBranches.length > 0 && selectedBranches.some(branch => flattenedBranches.includes(branch.toUpperCase()));
  
    console.log('Selected Branches:', selectedBranches);
    console.log('Includes Selected Branch:', includesSelectedBranch);
  
    // Only render the card if 'ALL' is selected or if any of the selected branches is included
    if (selectedBranches.length === 1 && selectedBranches[0] !== 'ALL' && !includesSelectedBranch) {
      console.log('Skipping rendering:', internship);
      return false; // Skip rendering
    }
  
    console.log('Rendering:', internship);
    return true;
  });
  

  if (id && !internship) {
    return <div>Loading internship details...</div>;
  }

  return (
    <div className="homedetailsofstudent">
      {id && (
        <div className="internship-detailsofstudents">
          <h4>{internship.internshipTitle}</h4>
          {/* Render other internship details here */}
        </div>
      )}

      <div className="all-internshipsofstudents">
        <h1>All Internships</h1>

        {/* Search bar */}
        <div className="search-container">
          <div className="search-bar">
            <p><strong>Search Here:</strong></p>
            <input
              type="text"
              placeholder="Search by Company Name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Filter buttons */}
        <div className="filter-container">
          <h4>Filter by:</h4>
          {['ALL', 'CSE', 'CSM', 'AIDS', 'AIML', 'IT', 'CET', 'ECE', 'EEE', 'CIVIL', 'MECH', 'BIO-TECH', 'CHEM'].map((branch) => (
            <button
              key={branch}
              className={`filter-button ${selectedBranches.includes(branch) ? 'selected' : ''}`}
              onClick={() => handleBranchButtonClick(branch)}
            >
              {branch}
            </button>
          ))}
        </div>

        {/* List of internships */}
        <div className="internship-cardsofstudents">
          {filteredInternshipsByBranch.map((internship) => (
            <div key={internship._id} className="internship-cardofstudents">
              <h3>{internship.internshipTitle}</h3>
              <p><strong>Internship Type:</strong> {internship.internshipType}</p>
              <p><strong>Description:</strong> {internship.internshipDescription}</p>
              <p><strong>Company:</strong> {internship.companyName}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Eligible branches:</strong> {internship.branchesEligible.join(', ')}</p>
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

export default StudentInternshipDetails;
