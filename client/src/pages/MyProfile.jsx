import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { CameraIcon } from "../components/MySVGIcons";


import Navbar from "../components/Navbar";
import "../styles/MyProfile.css";
import BasicDetails from "../components/MyProfileComponent/BasicDetails";
import ShortProfile from "../components/MyProfileComponent/ShortProfile";
import EducationDetails from "../components/MyProfileComponent/EducationDetails";
import SkillDetails from "../components/MyProfileComponent/SkillDetails";
import ExperienceDetails from "../components/MyProfileComponent/ExperienceDetails";
import ProfilePopUp from "../components/MyProfileComponent/ProfilePopUp";


const YourComponent = ({ activeTab, userData, setUserData }) => {
  return (
    <div>
      {activeTab === 'basic' && <BasicDetails userData={userData} setUserData={setUserData} />}
      {activeTab === 'education' && <EducationDetails userData={userData} setUserData={setUserData} />}
      {activeTab === 'experience' && <ExperienceDetails userData={userData} setUserData={setUserData} />}
      {activeTab === 'skills' && <SkillDetails userData={userData} setUserData={setUserData} />}
    </div>
  );
};

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isBack, setIsBack] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      if (!cookies.token) {
        navigate("/login");
      }

      try {
        const response = await axios.post(
          "http://localhost:4000/profile",
          {},
          { withCredentials: true }
        );

        const { status, user } = response.data;

        if (!status) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setUserData(user);
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
        // Handle error as needed
      }
    };

    loadProfileData();
  }, [cookies.token, navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const Logout = () => {
    removeCookie("token");
    navigate("/");
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
      <div className="main-container">
        <div className="user-background">
          <div className="user-background-img">
          <img
            src={
              userData.backgroundImage
                ? `http://localhost:4000/fetchProfileImage/${userData.backgroundImage}`
                : `images/user-background-photo.jpg`
            }
            alt="User Profile Photo"
          />
            <div className="user-background-icon">
            <div className="background-icon" onClick={openPopup}>
              <CameraIcon />
            </div>
          </div>
          </div>
        </div>
        <div className="user-detail-container">
          <ShortProfile userData={userData} setUserData={setUserData} />
          <div className="user-info-container right">
            <div className="my-profile-header">
              <div className="my-profile-tabs">
                <div
                  className={`profile-tabs basic-details-tab ${activeTab === 'basic' ? 'active' : ''}`}
                  onClick={() => handleTabClick('basic')}
                >
                  <span>Basic details</span>
                </div>
                <div
                  className={`profile-tabs edu-details-tab ${activeTab === 'education' ? 'active' : ''}`}
                  onClick={() => handleTabClick('education')}
                >
                  <span>Education</span>
                </div>
                <div
                  className={`profile-tabs experience-details-tab ${activeTab === 'experience' ? 'active' : ''}`}
                  onClick={() => handleTabClick('experience')}
                >
                  <span>Experience</span>
                </div>
                <div
                  className={`profile-tabs skill-details-tab ${activeTab === 'skills' ? 'active' : ''}`}
                  onClick={() => handleTabClick('skills')}
                >
                  <span>Skills</span>
                </div>
              </div>
            </div>
            <YourComponent activeTab={activeTab} userData={userData} setUserData={setUserData} />
          </div>
        </div>
      </div>
      {showPopup && (
          <ProfilePopUp closePopup={closePopup} isBack={isBack} userData={userData} />
        )}
      <ToastContainer />
    </>
  );
};

export default MyProfile;
