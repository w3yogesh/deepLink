import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer} from "react-toastify";

import Navbar from "../components/Navbar";
import "../styles/MyProfile.css";
import BasicDetails from "../components/MyProfileComponent/BasicDetails";
import ShortProfile from "../components/MyProfileComponent/ShortProfile";
import EducationDetails from "../components/MyProfileComponent/EducationDetails";
import SkillDetails from "../components/MyProfileComponent/SkillDetails";


const MyProfile = (props) => {
  const [userProfile, setUserProfile] = useState("");
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [userData, setUserData] = useState("");

  
  useEffect(() => {
    const loadProfileData = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000/profile",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      if (!status) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setUserData(user);
      }
      return status
        ? console.log("User Loaded")
        : (removeCookie("token"), navigate("/login"));
    };
    loadProfileData();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/");
  };

  // const tempUser = {
  //   firstName: "Sandipan",
  //   lastName: "Sarkar",
  //   gender: "male",
  //   mobileNo: "81******",
  //   userName: "Sandipan",
  //   email: "codingkaro21@gmail.com",
  //   headline: "this is headline",
  //   address: {
  //     country: "India",
  //     city: "midnapore",
  //   },
  //   education: [
  //     {
  //       institution: "MNNIT",
  //       degree: "MCA",
  //       field: "computer science",
  //       grade: "A",
  //       startDate: new Date("2022-03-25"),
  //       endDate: new Date("2022-03-25"),
  //     },
  //   ],
  //   skill: [{
  //     name: "cpp",
  //     level: "8.5",
  //   }],
  // };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="user-detail-container">
          <ShortProfile userData={userData} setUserData={setUserData}/>
          <div className="user-info-container right">
            <BasicDetails userData={userData} setUserData={setUserData} />
            <EducationDetails userData={userData} setUserData={setUserData} />
            <SkillDetails userData={userData} setUserData={setUserData} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MyProfile;
