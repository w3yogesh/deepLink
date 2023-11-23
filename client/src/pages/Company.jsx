import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar";
import JobList from "../components/MyCompany/JobList";
import ServiceList from "../components/MyCompany/ServiceList";
import { OpenLinkIcon } from '../components/MySVGIcons';
import "../styles/CompanyDetail.css";
import { useNavigate } from "react-router-dom";
import CompanyPostCard from '../components/FeedComponent/CompanyPostCard';
import CompanyPosts from "../components/CompanyPosts";

import "../styles/Feed/Feed.css";

const CompanyComponent = ({ activeTab, companyId }) => {
  return (
    <div className="company-main-wrapper">
      {activeTab === "AllJobs" && <JobList companyId={companyId} />}
      {activeTab === "AllService" && <ServiceList companyId={companyId} />}
    </div>
  );
};

export default function CompanyDetail2() {
  const [loading, setLoading] = useState(true);
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [activeTab, setActiveTab] = useState("Posts");
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
        } else {
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

  console.log(allPostObj);
  useEffect(() => {
    // Fetch the details of the specific company from the backend
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/company/${companyId}`);
        setCompany(response.data.company);
      } catch (error) {
        console.error('Error fetching company details:', error.message);
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

  // if (loading) {
  //   return <div>Loading...</div>; // Render a loading message while data is being fetched
  // }

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
          <img src={company.cover ? `http://localhost:4000/fetchCompanyImage/${company.cover}`: "/images/company_cover.jpg"} alt="company cover photo" />
          </div>
          <div className="company-logo">
            <img src={company.logo ? `http://localhost:4000/fetchCompanyImage/${company.logo}`: "/images/user-profile-photo.png"} alt="company logo" />
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
                <span className="coompany-head">{company.headquarter},</span>
              </div>
              {company.website && <div className="company-action">
                  <button className="company-website"><a target='_blank' href={company.website}>Website <OpenLinkIcon/></a></button>
                </div>}
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


  </>
  );
}
