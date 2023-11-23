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
  const [senderId, setSenderId] = useState(null);

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

  const handleAuth = async () => {
    const { data } = await axios.post(
      "http://localhost:4000",
      {},
      { withCredentials: true }
    );
    const { status, user } = data;
    if (status) {
      setSenderId(user._id);
    }
    else {
      
    }
  };


  useEffect(() => {
    handleAuth();
    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  } 
  return (
    <>
      <Navbar />
      <div className="user-profile-container grid-container">
            <ShortUserProfile userData={user} senderId={senderId}/>
            <MainUserProfile userData={user} />
      </div>
    </>
  );
};

export default UserDetails;
