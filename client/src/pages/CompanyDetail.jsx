import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Services from "./Services";
import JobOpenings from "./JobOpenings";
import { Link } from "react-router-dom";
import AppliedUser from "./AppliedUser";
import Navbar from "../components/Navbar";
import JobList from "./JobList";
import ServiceList from "./ServiceList";
import JobPostingForm from "./JobPostingForm";
import ServiceForm from "./ServiceForm";
import "../styles/CompanyDetail.css";

const CompanyComponent = ({ activeTab, companyId }) => {
  return (
    <div>
      {activeTab === "jobpost" && <JobPostingForm companyId={companyId} />}
      {activeTab === "addService" && <ServiceForm companyId={companyId} />}
      {activeTab === "AllJobs" && <JobList companyId={companyId} />}
      {activeTab === "AllService" && <ServiceList companyId={companyId} />}
      {activeTab === "appliedUsers" && <AppliedUser companyId={companyId} />}

    </div>
  );
};

export default function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [appliedUsers, setAppliedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("jobpost");

  useEffect(() => {
    // Fetch the details of the specific company from the backend
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/company/${companyId}`
        );
        setCompany(response.data.company);
      } catch (error) {
        console.error("Error fetching company details:", error.message);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  if (!company) {
    return <div>Loading...</div>;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar />

      <div className="company-main-container grid-container">
        <div className="company-sidebar">
          <div className="left-menu">
            <section class="side-menu">
              <h6 class="section-heading">Manage Company</h6>
              <div class="side-menu-item">
                <div
                  className={`item-link ${
                    activeTab === "jobpost" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("jobpost")}
                >
                  <div class="itme-svg"></div>
                  <span>Post a job</span>
                </div>
              </div>
              <div class="side-menu-item">
                <div
                  className={`item-link ${
                    activeTab === "addService" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("addService")}
                >
                  <div class="itme-svg"></div>
                  <span>Add Services</span>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="company-container">
          <div className="company-main-card">
            <div className="company-background">
              <img
                src={`http://localhost:4000/fetchImage/${company.image}`}
                alt="trial"
              />
            </div>
            <div className="company-logo">
              <img src="/images/user-profile-photo.png" alt="trial" />
            </div>
            <div className="company-meta">
              <div className="company-title">
                <h2>{company.companyName}</h2>
              </div>
              <div className="company-info-container">
                <div className="company-info">
                  <span className="label">Field</span>{" "}
                  <span className="company-field"> {company.field}</span>
                  <span className="label">Headquarter</span>
                  <span className="coompany-head">{company.headquarter}</span>
                </div>
                <div className="company-action">
                  <button>Website</button>
                </div>
              </div>
            </div>
          </div>
          <div class="company-header">
            <div class="my-profile-tabs">
              <div className={`profile-tabs  ${
                    activeTab === "AllJobs" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("AllJobs")}>
                <span>Jobs</span>
              </div>
              <div className={`profile-tabs  ${
                    activeTab === "AllService" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("AllService")}>
                <span>Services</span>
              </div>
              <div className={`profile-tabs  ${
                    activeTab === "appliedUsers" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("appliedUsers")}>
                <span>Applied Users</span>
              </div>
            </div>
          </div>
          <CompanyComponent activeTab={activeTab} companyId={companyId} />

          <div className="products"></div>

          
        </div>
      </div>
    </>
  );
}
