import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import * as XLSX from "xlsx";

const AppliedUser = ({ companyId }) => {
  const [jobs, setAppliedUsers] = useState([]);

  useEffect(() => {
    const fetchAppliedUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/appliedusers/${companyId}`
        );
        console.log(response.data);
        setAppliedUsers(response.data.jobs);
      } catch (error) {
        console.error("Error fetching applied users:", error);
      }
    };

    fetchAppliedUsers();
  }, [companyId]);

  const downloadExcel = (job) => {
    const usersData = job.appliedBy.map((user) => {
      const skillsString = user.skill
        .map((skill) => skill.skillName)
        .join(", ");
      return {
        Name: `${user.firstName} ${user.lastName}`,
        Email: `${user.email}`,
        Gender: `${user.gender}`,
        Skills: `${skillsString}`,
        PhoneNumber: `${user.phoneNumber}`,
      };
    });

    // const ws = XLSX.utils.json_to_sheet(usersData);
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Users");
    // XLSX.writeFile(wb, `${job.title}_Users.xlsx`);
  };
  console.log(jobs);
  return (
    <div className="all-aplieds">
      <h2>Applied Users</h2>
      <div className="applied-list-container">
        {jobs.map((job) => (
          <div className="applied-list" key={job._id}>
            <h3>{job.title}</h3>
            <table className="job-applied-list">
              <thead className="job-applied-head">
                <tr className="job-applied-row">
                  <th>Username</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Skill</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
              {job.appliedBy.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <Link to={`/userprofileview/${user._id}`}>
                        {user.firstName} {user.lastName}
                      </Link>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>
                      {user.skill.map((skill) => skill.skillName).join(", ")}
                    </td>
                    <td>{user.phoneNumber}</td>
                  </tr>
              ))}
              </tbody>
            </table>
            <button onClick={() => downloadExcel(job)}>Download Excel</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedUser;
