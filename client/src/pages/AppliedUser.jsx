import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const AppliedUser = ({ companyId }) => {
  const [jobs, setAppliedUsers] = useState([]);

  useEffect(() => {
    // Function to fetch applied users
    const fetchAppliedUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/appliedusers/${companyId}`);
        console.log(response.data);
        setAppliedUsers(response.data.jobs);
      } catch (error) {
        console.error('Error fetching applied users:', error);
      }
    };

    fetchAppliedUsers();
  }, [companyId]);

  return (
    <div>
      <h2>Applied Users</h2>
      {jobs.map((job) => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p>Company: {job.company[0]}</p>
          <p>Location: {job.location}</p>
          <p>Description: {job.description}</p>
          <ul>
            {job.appliedBy.map((user) => (
             <li key={user._id}>
             user: <Link to={`/userprofileview/${user._id}`} > {user.firstName} {user.lastName}</Link>
              </li> 
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AppliedUser;
