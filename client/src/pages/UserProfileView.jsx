import { React, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/userProfile.css";
import ShortUserProfile from "../components/UserProfileComponent/ShortUserProfile";
import MainUserProfile from "../components/UserProfileComponent/MainUserProfile";
import { useEffect } from "react";
import axios from 'axios';

// Retrieve the API URL from environment variables
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Create an Axios instance with the base 
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Include cookies if needed
});
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [userName, setUserName] = useState("");


  const fetchUserDetails = async () => {
    try {
      const response = await api.get(
        `/userprofile/${userId}`
      );
      setUser(response.data.user);
      setUserName(response.data.user.firstName);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  const handleAuth = async () => {
    const { data } = await api.post(
      "/",
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
    return <Loading/>;
  } 
  return (
    <>
      <Navbar />
      <div className="user-profile-container grid-container">
            <ShortUserProfile userData={user} senderId={senderId}/>
            <MainUserProfile userData={user} senderId={senderId} userName={userName}/>
      </div>
    </>
  );
};

export default UserDetails;
