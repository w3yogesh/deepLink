import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [companyFilter, setCompanyFilter] = useState('');
  const [requirementsFilter, setRequirementsFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/jobs');
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
    };

    fetchJobs();
  }, []);

  const uniqueCompanies = [...new Set(jobs.map((job) => job.company))];
  const uniqueRequirements = [...new Set(jobs.map((job) => job.requirements))];
  const uniqueLocations = [...new Set(jobs.map((job) => job.location))];

  const formatDateFromLong = (dateInLong) => {
    const date = new Date(dateInLong);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <h2>Recent openings</h2>

      {/* Company Dropdown */}
      <label>
        Company:
        <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
          <option value="">All Companies</option>
          {uniqueCompanies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </label>

      {/* Requirements Dropdown */}
      <label>
        Requirements:
        <select
          value={requirementsFilter}
          onChange={(e) => setRequirementsFilter(e.target.value)}
        >
          <option value="">All Requirements</option>
          {uniqueRequirements.map((requirement) => (
            <option key={requirement} value={requirement}>
              {requirement}
            </option>
          ))}
        </select>
      </label>

      {/* Location Dropdown */}
      <label>
        Location:
        <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option value="">All Locations</option>
          {uniqueLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>

      {/* Job listings */}
      {jobs
        .filter(
          (job) =>
            (companyFilter === '' || job.company === companyFilter) &&
            (requirementsFilter === '' || job.requirements === requirementsFilter) &&
            (locationFilter === '' || job.location === locationFilter)
        )
        .map((job) => (
          <div key={job._id}>
            <h3>{job.title}</h3>
            <p>Company: {job.company}</p>
            <p>Requirements: {job.requirements}</p>
            <p>Location: {job.location}</p>
            <p>Posted on: {formatDateFromLong(job.createdAt)}</p>
            {/* You can add more details as needed */}
          </div>
        ))}
    </div>
  );
};

export default AllJobs;
