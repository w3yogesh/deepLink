import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const JobSidebar = ({ myId, toast }) => {
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
        console.error("Error fetching jobs:", error.message);
      }
    };
    fetchJobs();
  }, []);

  const applyNow = async (jobId) => {
    try {
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


        toast.error("You have already applied for this job", {
          position: "top-right",
        });

     
    }
  };

  const withdraw = async(jobId)=> {

    try {
      const response = await axios.post("http://localhost:4000/withdraw", {
        jobId,
        myId,
      });

      toast.success("Withdraw Successfully", {
        position: "top-right",
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error withdrawing for the job:", error.message);


        toast.error("You have Successfully Withdrawthis job", {
          position: "top-right",
        });
  }
}

  const uniqueCompanies = [...new Set(jobs.map((job) => (job.postedBy ? job.postedBy.companyName : null)))];
  const uniqueRequirements = [...new Set(jobs.map((job) => job.requirements))];
  const uniqueLocations = [...new Set(jobs.map((job) => job.location))];

  const formatDateFromLong = (dateInLong) => {
    const date = new Date(dateInLong);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  console.log('jobs : ', jobs);

  return (
    <div className="jobs-wrapper">
      <h2>Recent openings</h2>
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
                 <Link to={`/company/${job.postedBy._id}`}><a>{(job.postedBy ? job.postedBy.companyName : null)}</a></Link> 
                </span>
                <span className="job-publish-date">
                  Posted on: {formatDateFromLong(job.createdAt)}
                </span></div>
                <span className="job-list-loc">Location: {job.location}</span>
                <span className="job-list-req">
                  Requirements: {job.requirements}
                </span>
              </div>
              {!job.appliedBy.includes(myId) && <div className="job-actions">
                <button onClick={() => applyNow(job._id)}>Apply Now</button>
              </div>}
              {job.appliedBy.includes(myId) && <div className="job-actions">
                <button onClick={() => withdraw(job._id)}> Withdraw </button>
              </div>}
            </div>
          ))}
      </div>
    </div>
  );
};
