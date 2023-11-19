import React, { useState, useEffect } from "react";
import axios from "axios";

export const JobListing = ({ myId, toast }) => {
  const [jobs, setJobs] = useState([]);
  const [companyFilter, setCompanyFilter] = useState("");
  const [requirementsFilter, setRequirementsFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/jobs");
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching services:", error.message);
      }
    };

    fetchJobs();
  }, []);

  const applyNow = async (jobId) => {
    try {
      // Send jobId and myId to the backend for application
      const response = await axios.post("http://localhost:4000/apply", {
        jobId,
        myId,
      });

      toast.success("Applied Successfully", {
        position: "top-right",
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error applying for the job:", error.message);

      toast.error("error while applying", {
        position: "top-right",
      });
    }
  };

  const uniqueCompanies = [...new Set(jobs.map((job) => job.company))];
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
        // value={"b"}
        // onChange={}
      />
    </div>
        {/* Company Dropdown */}
        <div className="compnay-filter job-filter">
          {/* <label htmlFor="Company">Company</label> */}

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

        <div className="requirement-filter job-filter">
          {/* Requirements Dropdown */}
          {/* <label htmlFor="Requirements">Requirements</label> */}

          <select
            name="Requirements"
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
        </div>

        <div className="location-filter job-filter">
          {/* Location Dropdown */}
          {/* <label htmlFor="Location">Location</label> */}

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

      {/* Job listings */}
      <div className="job-list-section">
        {jobs
          .filter(
            (job) =>
              (companyFilter === "" || job.company === companyFilter) &&
              (requirementsFilter === "" ||
                job.requirements === requirementsFilter) &&
              (locationFilter === "" || job.location === locationFilter)
          )
          .map((job) => (
            <div className="job-list-item" key={job._id}>
              <div className="job-list-logo">
                <img src="/images/user-profile-photo.png" alt="" />
              </div>
              <div className="job-list-title">
                <h3>{job.title}</h3>
              </div>
              <div className="job-list-content">
                <div className="job-meta-info"><span className="company-link">
                  <a>{job.company}</a>
                </span>
                <span className="job-publish-date">
                  Posted on: {formatDateFromLong(job.createdAt)}
                </span></div>
                <span className="job-list-loc">Location: {job.location}</span>
                <span className="job-list-req">
                  Requirements: {job.requirements}
                </span>
              </div>
              <div className="job-actions">
                <button onClick={() => applyNow(job._id)}>Apply Now</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
