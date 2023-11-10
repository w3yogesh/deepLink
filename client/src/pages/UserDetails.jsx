import { React, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/UserDetails.css";
import BasicDetails from "../components/UserProfileComponent/BasicDetails";
import { ShortProfile } from "../components/UserProfileComponent/ShortProfile";
import EducationDetails from "../components/UserProfileComponent/EducationDetails";
import SkillDetails from "../components/UserProfileComponent/SkillDetails";

const UserDetails = (props) => {
  const tempUser = {
    firstName: "Sandipan",
    lastName: "Sarkar",
    gender: "male",
    mobileNo: "81******",
    userName: "Sandipan",
    email: "codingkaro21@gmail.com",
    headline: "this is headline",
    address: {
      country: "India",
      city: "midnapore",
    },
    education: [
      {
        institution: "MNNIT",
        degree: "MCA",
        field: "computer science",
        grade: "A",
        startDate: new Date("2022-03-25"),
        endDate: new Date("2022-03-25"),
      },
    ],
    skill: [{
      name: "cpp",
      level: "8.5",
    }],
  };

  const [userData, setUserData] = useState(tempUser);

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="user-detail-container">
          <ShortProfile />
          <div className="user-info-container right">
            <BasicDetails userData={userData} setUserData={setUserData} />
            <EducationDetails userData={userData} setUserData={setUserData} />
            <SkillDetails userData={userData} setUserData={setUserData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
