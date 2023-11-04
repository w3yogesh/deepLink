import React from 'react';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// import ProfilePicture from './ProfilePicture';
// import Header from './Header';
// import Summary from './Summary';
// import Experience from './Experience';
// import Education from './Education';
// import Skills from './Skills';


const Profile = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [userProfile, setUserProfile] = useState("");

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
        const {status,user} = data;
        if(!status){
          toast("User Not Found", {
            position: "top-right",
          })
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }else{
          setUserProfile(user);
        }
        return status
          ? toast(`Hello ${user.username}`, {
              position: "top-right",
            })
          : (removeCookie("token"), navigate("/login"));
      };
      loadProfileData();
    }, [cookies, navigate, removeCookie]);
    const Logout = () => {
      removeCookie("token");
      navigate("/");
    };
    return (
      
        <>
          {/* <div className="profile">
            <ProfilePicture />
            <Header />
            <Summary />
            <Experience />
            <Education />
            <Skills />
          </div> */}
            <h1>{userProfile.username}</h1>
            <h1>{userProfile.email}</h1>
            <button onClick={Logout}>LOGOUT</button>
            <ToastContainer />
        </>
        
      )
 
}

export default Profile;
