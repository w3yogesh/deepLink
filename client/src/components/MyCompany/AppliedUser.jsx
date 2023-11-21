import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

const AppliedUser = ({ companyId }) => {
  const [jobs, setAppliedUsers] = useState([]);

  useEffect(() => {
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

  const downloadExcel = (job) => {
    const usersData = job.appliedBy.map((user) => ({
      Name: `${user.firstName} ${user.lastName}`,
      // Add more user data properties as needed
    }));

    const ws = XLSX.utils.json_to_sheet(usersData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    // Save the Excel file
    XLSX.writeFile(wb, `${job.title}_Users.xlsx`);
  };

  return (
    <div className='all-aplieds'>
      <h2>Applied Users</h2>
      <div className="applied-list-container">
      {jobs.map((job) => (
        <div className='applied-list' key={job._id}>
          <h3>{job.title}</h3>
          <ul>
            {job.appliedBy.map((user) => (
              <li key={user._id}>
                User: <Link to={`/userprofileview/${user._id}`}>{user.firstName} {user.lastName}</Link>
              </li>
            ))}
          </ul>
          <button onClick={() => downloadExcel(job)}>Download Excel</button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default AppliedUser;
