import React from "react";
import Navbar from "../components/Navbar";
import "../styles/UserDetails.css";
import BasicDetails from "../components/UserProfileComponent/BasicDetails";
import { ShortProfile } from "../components/UserProfileComponent/ShortProfile";
import EducationDetails from "../components/UserProfileComponent/EducationDetails";
import SkillDetails from "../components/UserProfileComponent/SkillDetails";


const UserDetails = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="user-detail-container">
          <ShortProfile/>
          <div className="user-info-container right">
            <BasicDetails/>
            <EducationDetails/>
            <SkillDetails/>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
