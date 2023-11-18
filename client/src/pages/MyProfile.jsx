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

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="user-background">
          <div className="user-background-img">
            <img
              src="https://img.freepik.com/free-photo/assortment-teacher-s-day-elements_23-2149044959.jpg?w=1060&t=st=1700249398~exp=1700249998~hmac=85da4ad2cfbd384ec308d0fcb610ce53cfed9a623097575f8a09aba979c1aa76"
              alt=""
            />
            <div className="user-background-icon">
            <div className="background-icon">
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
      <ToastContainer />
    </>
  );
};

export default MyProfile;
