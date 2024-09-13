import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

// Retrieve the API URL from environment variables
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Include cookies if needed
});

export const JobListing = ({ myId, toast }) => {
  const [jobs, setJobs] = useState([]);
  const [companyFilter, setCompanyFilter] = useState("");
  const [requirementsFilter, setRequirementsFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [searchInput, setSearchInput] = useState(""); // Step 1: Add search input state
  const [showJobDes, setShowJobDes] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
      }
    };
    fetchJobs();
  }, []);

  const applyNow = async (jobId) => {
    try {
      const response = await api.post("/apply", {
        jobId,
        myId,
      });

      toast.success("Applied Successfully", {
        position: "top-right",
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error applying for the job:", error.message);

      toast.error("You have already applied for this job", {
        position: "top-right",
      });
    }
  };

  const withdraw = async (jobId) => {
    try {
      const response = await api.post("/withdraw", {
        jobId,
        myId,
      });

      toast.success("Withdraw Successfully", {
        position: "top-right",
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error withdrawing for the job:", error.message);

      toast.error("You have Successfully Withdraw this job", {
        position: "top-right",
      });
    }
  };

  const uniqueCompanies = [
    ...new Set(jobs.map((job) => (job.postedBy ? job.postedBy.companyName : null))),
  ];
  const uniqueRequirements = [...new Set(jobs.map((job) => job.requirements))];
  const uniqueLocations = [...new Set(jobs.map((job) => job.location))];

  const formatDateFromLong = (dateInLong) => {
    const date = new Date(dateInLong);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="jobs-wrapper">
      <h2>Recent openings</h2>
      <div className="job-filters">
        <div className="job-search-box">
          <input
            type="text"
            placeholder="Search companies"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="company-filter job-filter">
          <select
            name="Company"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
          >
            <option value="">All Companies</option>
            {uniqueCompanies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="requirement-filter job-filter">
          <select
            name="Requirements"
            value={requirementsFilter}
            onChange={(e) => setRequirementsFilter(e.target.value)}
          >
            <option value="">Elligible</option>
            {uniqueRequirements.map((requirement) => (
              <option key={requirement} value={requirement}>
                {requirement}
              </option>
            ))}
          </select>
        </div> */}

        <div className="location-filter job-filter">
          <select
            name="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="job-list-section">
        {jobs
          .filter(
            (job) =>
              (companyFilter === "" || job.postedBy.companyName === companyFilter) &&
              (requirementsFilter === "" || job.requirements === requirementsFilter) &&
              (locationFilter === "" || job.location === locationFilter) &&
              (searchInput === "" || job.postedBy.companyName.toLowerCase().includes(searchInput.toLowerCase()))
          )
          .map((job) => (
            <div className="job-list-item" 
              onMouseEnter={() => setShowJobDes(job._id)}
              onMouseLeave={() => setShowJobDes(null)} 
              key={job._id}>
              <div className="job-list-logo">
                <img src={job.postedBy.logo ?`${apiUrl}/fetchCompanyImage/${job.postedBy.logo}` : `/images/company_logo.png`} alt="" />
              </div>
              <div className="job-list-title">
                <h3>{job.title}</h3>
              </div>
              <div className="job-list-content">
                <div className="job-meta-info">
                  <span className="company-link">
                    <Link to={`/company/${job.postedBy._id}`}>
                      <a>{job.postedBy.companyName}</a>
                    </Link>
                  </span>
                  <span className="job-publish-date">
                    Posted on: {formatDateFromLong(job.createdAt)}
                  </span>
                </div>
                <span className="job-list-loc">Location: {job.location}</span>
                <span className="job-list-req">
                  <b> Elligibility: </b> {job.requirements}
                </span>
                {/* {showJobDes === job._id && (
                  <span className="job-description">
                    <b> Description: </b> {job.description}
                  </span>
                )} */}
              </div>
              {!job.appliedBy.includes(myId) && (
                <div className="job-actions">
                  <button onClick={() => applyNow(job._id)}>Apply Now</button>
                </div>
              )}
              {job.appliedBy.includes(myId) && (
                <div className="job-actions">
                  <button onClick={() => withdraw(job._id)}>Withdraw</button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
