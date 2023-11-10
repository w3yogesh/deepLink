import React from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import UserListComponent from "../components/UserList";
import ConnectionRequest from "../components/ConnectionRequests";
import ConnectionSent from "../components/ConnectionSent";
import MyConnections from "../components/MyConnections";

// import "../styles/Profile.css";

import PostComponent from "../components/PostComponent";

import ProfileUpdateForm from "./ProfileUpdateForm";
import Navbar from "../components/Navbar";

import Button from '@mui/material/Button';

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [userProfile, setUserProfile] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

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
        toast("User Not Found", {
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setUserProfile(user);
        setUserData({
          firstName: user.firstName,
          lastName: user.lastName,
        });
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

  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  const [showAllUser, setShowAllUser] = useState(false)
  const [showConnectionRequest, setShowConnectionRequest] = useState(false)
  const [showConnectionSent, setShowConnectionSent] = useState(false)
  const [showMyConnections, setShowMyConnections] = useState(false)

  const handleUpdateUserProfile = async () => {
    try {
      // Make a PUT or PATCH request to update the user's data
      const response = await axios.put(
        "http://localhost:4000/updateUserProfile",
        {
          NewName: updatedName,
          userId: userProfile._id,
        }
      );

      if (response.data.success) {
        toast(response.data.message, {
          position: "top-right",
        });
      } else {
        console.log(response.data.message);
        toast(response.data.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast("Server error", {
        position: "top-right",
      });
    }
  };

  // const handleUpdateUserProfile = ()=> {
  //   setUserData({
  //     firstName : userProfile.firstName,
  //     lastName : userProfile.lastName,
  //   })
  //   setShowForm(true);
  // }



    return (
      <>
          <Navbar/>
          {/* <ProfileUpdateForm
            userId={userProfile._id}
            userData={userData}
            setUserData={setUserData}
            setShowForm={setShowForm}
          /> */}
        <div className="main-container">
          <div className="profile">
            <div className="profile-container">
              <div className="profile-photo">
                <img
                  src="/images/user-profile-photo.svg"
                  alt="User Profile Photo"
                />
              </div>
              <h1 className="user-name">
                {userProfile.firstName} {userProfile.lastName}
              </h1>
              <p className="user-headline">
                MCA' 25 @NIT Allahabad | Front-end Developer | SEO Specialist
              </p>
              <p className="user-location">Rajasthan, India</p>
              <p className="user-conections">646 followers * 500+ connections</p>
              <button
                className="edit-button"
                id="edit-button"
                onclick="toggleEditForm()"
              >
                Edit
              </button>
              <form className="edit-form" id="edit-form">
                <input type="text" id="edit-name" placeholder="New Name" />
                <input type="text" id="edit-title" placeholder="New Title" />
                <input
                  type="text"
                  id="edit-location"
                  placeholder="New Location"
                />
                <button
                  className="save-button"
                  id="save-button"
                  onclick="saveChanges()"
                >
                  Save
                </button>
              </form>
            </div>

            <button onClick={Logout}>LOGOUT</button>
          </div>
          <div className="main-body">
            <div className="user-detail-form">
              <form action="">
                
              </form>
            </div>
          </div>

        </div>

      <PostComponent userEmail={userProfile.email} />
      
      <Button variant="contained" onClick={()=>{setShowAllUser(!showAllUser)}}> All User </Button>
      { showAllUser && <UserListComponent senderId={userProfile._id} />}

      <Button variant="contained" onClick={()=>{setShowConnectionRequest(!showConnectionRequest)}}> recieved </Button>
      {showConnectionRequest && <ConnectionRequest senderId={userProfile._id} />}

      <Button variant="contained" onClick={()=>{setShowConnectionSent(!showConnectionSent)}}> sent </Button>
      {showConnectionSent && <ConnectionSent senderId={userProfile._id} />}

      <Button variant="contained" onClick={()=>{setShowMyConnections(!showMyConnections)}}> Connections </Button>
      {showMyConnections && <MyConnections senderId={userProfile._id} />}
          {/* <PostComponent userEmail={userProfile.email} /> */}
        {/* <UserListComponent senderId={userProfile._id} /> */}
        {/* <ConnectionRequest senderId={userProfile._id} />
        <ConnectionSent senderId={userProfile._id} />
        <MyConnections senderId={userProfile._id} /> */}

        <ToastContainer />
      </>
    );
  };
export default Profile;
