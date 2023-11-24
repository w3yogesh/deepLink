import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppliedUser from "../components/MyCompany/AppliedUser";
import Navbar from "../components/Navbar";
import JobList from "../components/MyCompany/JobList";
import ServiceList from "../components/MyCompany/ServiceList";
import JobPostingForm from "../components/MyCompany/JobPostingForm";
import ServiceForm from "../components/MyCompany/ServiceForm";
import "../styles/CompanyDetail.css";
import { OpenLinkIcon,CameraIcon } from "../components/MySVGIcons";
import CompanyPopUp from "../components/MyCompany/CompanyPopUp";
import { ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";
import CompanyPostCard from '../components/MyCompany/CompanyPostCard';
import CompanyPosts from "../components/MyCompany/CompanyPosts";

const CompanyComponent = ({ activeTab, companyId }) => {
  return (
    <div className="company-main-wrapper">
      
      {activeTab === "jobpost" && <JobPostingForm companyId={companyId} />}
      {activeTab === "CreatePost" && <CompanyPosts companyId={companyId} />}
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
  const [activeTab, setActiveTab] = useState("jobpost");
  const [showPopup, setShowPopup] = useState(false);
  const [isBack, setIsBack] = useState(false);

  const [loading, setLoading] = useState(true);

  
  const navigate = useNavigate();

  const [allPostObj, setPosts] = useState([]);
  const [userData, setUserData] = useState('');
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const auth = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = auth.data;
        setUserData(user);
        setUserId(user._id);
        setUserName(user.firstName);

        if (!status) {
          setTimeout(() => {
            navigate("/login");
          }, 1);
        }else if(!(userData.company&&userData.company.includes(companyId))){
          setTimeout(() => {
            navigate("/mycompanies");
          }, 1);
        }else {
          setUserData(user);
          const response = await axios.get(
            `http://localhost:4000/api/fetchcompanypost/${companyId}`
          );
          const postsData = response.data;
          setPosts(postsData);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [navigate]);
  const reversedPosts = Array.isArray(allPostObj) ? [...allPostObj].reverse() : [];

  console.log();

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

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
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
                  activeTab === "CreatePost" ? "active" : ""
                }`}
                onClick={() => handleTabClick("CreatePost")}
              ><div class="itme-svg"></div>
                <span>Write Post</span>
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
                src={
                  company.cover
                    ? `http://localhost:4000/fetchCompanyImage/${company.cover}`
                    : "/images/company_cover.jpg"
                }
                alt="company cover photo"
              />
              <div className="company-background-icon">
                <div className="cover-icon" onClick={() => { openPopup(); setIsBack(true); }}>
                  <CameraIcon />
                </div>
              </div>
            </div>
            <div className="company-logo">
              <img
                src={
                  company.logo
                    ? `http://localhost:4000/fetchCompanyImage/${company.logo}`
                    : "/images/user-profile-photo.png"
                }
                alt="company logo"
              />
              <div className="logo-upload-icon">
            <div className="logo-icon" onClick={() => { openPopup(); setIsBack(false); }}>
              <CameraIcon />
            </div>
          </div>
            </div>
            <div className="company-meta">
              <div className="company-title">
                <h2>{company.companyName}</h2>
              </div>
              <div className="company-info-container">
                <div className="company-info">
                  <span className="label">Field:</span>
                  <span className="company-field"> {company.field},</span>
                  <span className="label">Headquarter:</span>
                  <span className="coompany-head">{company.headquarter}</span>
                </div>
                {company.website && (
                  <div className="company-action">
                    <button className="company-website">
                      <a target="_blank" href={company.website}>
                        Website <OpenLinkIcon />
                      </a>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div class="company-header">
            <div class="my-profile-tabs">
            <div
                className={`profile-tabs  ${
                  activeTab === "Posts" ? "active" : ""
                }`}
                onClick={() => handleTabClick("Posts")}
              >
                <span>Posts</span>
              </div>
              <div
                className={`profile-tabs  ${
                  activeTab === "AllJobs" ? "active" : ""
                }`}
                onClick={() => handleTabClick("AllJobs")}
              >
                <span>Jobs</span>
              </div>
              <div
                className={`profile-tabs  ${
                  activeTab === "AllService" ? "active" : ""
                }`}
                onClick={() => handleTabClick("AllService")}
              >
                <span>Services</span>
              </div>
              <div
                className={`profile-tabs  ${
                  activeTab === "appliedUsers" ? "active" : ""
                }`}
                onClick={() => handleTabClick("appliedUsers")}
              >
                <span>Applied Users</span>
              </div>
              
            </div>
          </div>
          <CompanyComponent activeTab={activeTab} companyId={companyId} />
          <div className="products"></div>
          { activeTab === "Posts" && <div className="company-post-container">
          {reversedPosts.map((post, index) => (
            <div className="post-body" key={index}>
             <CompanyPostCard postObj={post} userId={userId} userName={userName}/>
            </div>
          ))}
        </div>}
          
          
        </div>
      </div>
      
      {showPopup && (
        <CompanyPopUp
          closePopup={closePopup}
          isBack={isBack}
          company={company}
        />
      )}
      <ToastContainer />
   </>
  );
}
