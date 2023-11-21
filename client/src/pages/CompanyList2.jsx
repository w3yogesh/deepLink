import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CompanyList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allCompanies, setAllCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedField, setSelectedField] = useState('all'); // Default: show all companies

  useEffect(() => {
    // Fetch all companies when the component mounts
    const fetchAllCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:4000/companies');
        setAllCompanies(response.data.companies);
        setFilteredCompanies(response.data.companies);
      } catch (error) {
        console.error('Error fetching companies:', error.message);
      }
    };

    fetchAllCompanies();
  }, []);

  useEffect(() => {
    // Update the list of filtered companies as the search query or selected field changes
    setFilteredCompanies(
      allCompanies.filter((company) =>
        company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedField === 'all' || company.field === selectedField)
      )
    );
  }, [searchQuery, allCompanies, selectedField]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
  };

  return (
    <div>
      <h2>List of Companies</h2>
      <input
        type="text"
        placeholder="Search by company name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <label htmlFor="fieldFilter">Filter by Field:</label>
      <select id="fieldFilter" value={selectedField} onChange={handleFieldChange}>
        <option value="all">All Fields</option>
        {/* Add options for each field based on your data */}
        <option value="technology">Technology</option>
        <option value="finance">Finance</option>
        <option value="CSE">software</option>
        {/* Add more options as needed */}
      </select>
      <ul>
        {filteredCompanies.map((company) => (
          <li key={company._id}>
            <Link to={`/company2/${company._id}`}>{company.companyName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
