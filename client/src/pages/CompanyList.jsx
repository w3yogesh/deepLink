import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CompanyList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allCompanies, setAllCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

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
    // Update the list of filtered companies as the search query changes
    setFilteredCompanies(
      allCompanies.filter((company) =>
        company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, allCompanies]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
      <ul>
        {filteredCompanies.map((company) => (
          <li key={company._id}>
            <Link to={`/company/${company._id}`}>{company.companyName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
