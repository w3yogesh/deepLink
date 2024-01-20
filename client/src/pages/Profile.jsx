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


import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [userProfile, setUserProfile] = useState("");
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


  const [showAllUser, setShowAllUser] = useState(false);
  const [showConnectionRequest, setShowConnectionRequest] = useState(false);
  const [showConnectionSent, setShowConnectionSent] = useState(false);
  const [showMyConnections, setShowMyConnections] = useState(false);


  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/search?query=${searchTerm}`
      );

      if (response.data.success) {
        setSearchResults(response.data.results);
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

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);


  return (
    <>
      <Navbar />
      <div className="main-container">

        <div className="main-body">
          <div className="user-detail-form">
            <form action=""></form>
          </div>
        </div>

        <div className="actions">
          <button
            variant="contained"
            onClick={() => {
              setShowAllUser(!showAllUser);
            }}
          >
            {" "}
            All User{" "}
          </button>
          {showAllUser && <UserListComponent senderId={userProfile._id} />}

          <button
            variant="contained"
            onClick={() => {
              setShowConnectionRequest(!showConnectionRequest);
            }}
          >
            {" "}
            recieved{" "}
          </button>
          {showConnectionRequest && (
            <ConnectionRequest senderId={userProfile._id} />
          )}

          <button
            variant="contained"
            onClick={() => {
              setShowConnectionSent(!showConnectionSent);
            }}
          >
            {" "}
            sent{" "}
          </button>
          {showConnectionSent && <ConnectionSent senderId={userProfile._id} />}

          <button
            variant="contained"
            onClick={() => {
              setShowMyConnections(!showMyConnections);
            }}
          >
            Connections
          </button>
          {showMyConnections && <MyConnections senderId={userProfile._id} />}
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search users by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {searchResults.map((user) => (
            <li key={user._id}>
                <Link to={`/userprofileview/${user._id}`}>
                {user.firstName} {user.lastName}
              </Link>
            </li>
          ))}
        </ul>
      </div>


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
