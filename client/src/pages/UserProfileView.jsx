import { React, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/userProfile.css";
import ShortUserProfile from "../components/UserProfileComponent/ShortUserProfile";
import MainUserProfile from "../components/UserProfileComponent/MainUserProfile";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/userprofile/${userId}`
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
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
      <div className="user-profile-container grid-container">
            <ShortUserProfile userData={user}/>
            <MainUserProfile userData={user} />
      </div>
    </>
  );
};

export default UserDetails;
