import { React, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/UserDetails.css";
import BasicDetails from "../components/UserProfileComponent/BasicDetails2";
import  ShortProfile from "../components/UserProfileComponent/ShortProfile";
import EducationDetails from "../components/UserProfileComponent/EducationDetails2";
import SkillDetails from "../components/UserProfileComponent/SkillDetails2";
import { useEffect } from "react";
import axios from "axios"; 
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  
    const {userId}=useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
      // Fetch the details of the specific company from the backend
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/userprofile/${userId}`);
          setUser(response.data.user);
        } catch (error) {
          console.error('Error fetching user details:', error.message);
        }
      };
  
      fetchUserDetails();
    }, [userId]);

    if(!user){
      return <div>Loading...</div>;
    }

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

  // const [userData, setUserData] = useState(tempUser);

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="user-detail-container">
          <ShortProfile userData={userData} setUserData={setUserData}/>
          <ShortProfile  userData={user} setUserData={setUser}  />
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
