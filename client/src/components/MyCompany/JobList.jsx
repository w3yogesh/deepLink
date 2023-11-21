import React, { useState, useEffect } from "react";
import axios from "axios";

const JobList = ({ companyId }) => {
  function formatDateFromLong(dateInLong) {
    const date = new Date(dateInLong);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  }

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/jobs/${companyId}`
        );
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching services:", error.message);
      }
    };

    fetchJobs();
  }, [companyId]);

  return (
    <div className="all-company-jobs">
      <h2>Recent openings</h2>
      <div className="all-job-list">
        {jobs.map((job) => (
          <div className="job-post" key={job._id}>
            <h3>{job.title}</h3>
            {/* <p>Company Name: {companyId.companyName}</p> */}
            <p>Requirements: {job.requirements}</p>
            <p>Location: {job.location}</p>
            <p>Posted on: {formatDateFromLong(job.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
