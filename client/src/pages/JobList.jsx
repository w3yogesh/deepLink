import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = ({ companyId }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const  fetchJobs= async () => {
      try {
        const response = await axios.get(`http://localhost:4000/jobs/${companyId}`);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
    };

    fetchJobs();
  }, [companyId]);

  return (
    <div>
      <h2>Recent openings</h2>
      {jobs.map((job) => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p>Requirements: {job.requirements}</p>
          <p>Location: {job.location}</p>
          <p>Posted on: {job.createdAt}</p>
          {/* You can add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default JobList;
