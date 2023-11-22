import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { JobListing } from "../components/JobComponent/JobListing";
import { BookMarkIcon , ClipCheckIcon, PostIcon } from "../components/MySVGIcons";
import "../styles/AllJobs.css"

const AllJobs = () => {
  const [myId, setMyId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = response.data;
        if (status) {
          setMyId(user._id);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error authenticating user:", error.message);
      }
    };
    userAuth();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="job-container grid-container">
        <div className=" job-sidebar">
          <div className="sidebar-content">
            <div className="job-items"><BookMarkIcon/>Saved Jobs</div>
            <div className="job-items"><ClipCheckIcon/>Applied Jobs</div>
          </div>
          <div className="post-job-btn">
            <div className="post-job">
            <a href="/company"> <PostIcon/>  Post a job </a>
            </div>
          </div>
        </div>
          <div className="job-main-container">
            <JobListing myId={myId} toast={toast} />
          </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default AllJobs;
