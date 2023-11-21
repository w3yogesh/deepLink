//SideBar user Profile
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShortUserProfile = ({ userData }) => {
  const recipientId = userData._id;
  const [senderId, setSenderId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();


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
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

  // console.log(senderId);
  const handleConnect = async () => {
    // console.log("hello")
    if (senderId) {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/connect/${senderId}/${recipientId}`
        );
        const { status, message } = response.data;
        if (status) {
          console.log(message);
          setIsConnected(true);
        } else {
          console.log(message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    
    }
    else{
      handleAuth();
    }
   
  };

  const city =
    userData && userData.address && userData.address.length > 0
      ? userData.address[0].city
      : null;
  const country =
    userData && userData.address && userData.address.length > 0
      ? userData.address[0].country
      : null;

  console.log(userData);
  return (
    <div className="profile-sidebar left">
      <div className="short-profile-view">
        <div className="profile-photo">
          <img src="/images/user-profile-photo.svg" alt="User Profile Photo" />
        </div>
        <div className="profile-meta">
          <h1 className="userName">
            {userData.firstName} {userData.lastName}
          </h1>
          <p className="userHeadline">{userData.headline}</p>
          <p className="userLocation">
            {city}, {country}
          </p>
          <p className="userConections"></p>
        </div>
        <div className="profile-actions">
          <div className="follow-btn primary-button" onClick={handleConnect} {...isConnected ? "disabled":""}>
            <span>{isConnected === true ?" Connected ": " Connect "}</span>
          </div>
          <div className="message-btn secondary-button">
            <a href="/messageuser">Message</a>
          </div>
        </div>
      </div>
      <div className="profile-skill">
        <h3 className="section-heading">Skills</h3>
        <div className="skills">
          <ul className="skill-list">
            {userData.skill.map((skill, index) => (
              <li className="skill-items" key={index}>
                <div className="skill-name">{skill.skillName}</div>
                <div className="skill-lavel">{skill.skillLevel}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ShortUserProfile;
