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

    const [updatedName, setUpdatedName] = useState('');
    //const [updatedEmail, setUpdatedEmail] = useState('');

  const handleUpdateUserProfile = async () => {
    try {
      // Make a PUT or PATCH request to update the user's data
      const response = await axios.put('http://localhost:4000/updateUserProfile', {
        // name: updatedName,
        NewName: updatedName,
        userId: userProfile._id,
      });
      
      if (response.data.success) {
        toast(response.data.message, {
          position: "top-right",
        })
      } else {
        console.log(response.data.message);
        toast(response.data.message, {
          position: "top-right",
        })
      }
    } catch (error) {
      toast("Server error", {
        position: "top-right",
      })
    }
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
            <h1>{userProfile._id}</h1>
            <h1>{userProfile.email}</h1>
            <h1>{userProfile.name}</h1>

            <button onClick={Logout}>LOGOUT</button>

            <div>
      <input
        type="text"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
      />
      {/* <input
        type="text"
        value={setUpdatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
      /> */}
      <button onClick={handleUpdateUserProfile}>Update Profile</button>
    </div>
            <ToastContainer />
        </>
        
      )
 
}

export default Profile;
