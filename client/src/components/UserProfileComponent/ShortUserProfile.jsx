//SideBar user Profile
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShortUserProfile = ({ userData, senderId}) => {
  const recipientId = userData._id;
  const [isConnected, setIsConnected] = useState(0);
  const navigate = useNavigate();


  // const handleAuth = async () => {
  //     const { data } = await axios.post(
  //       "http://localhost:4000",
  //       {},
  //       { withCredentials: true }
  //     );
  //     const { status, user } = data;
  //     if (status) {
  //       setSenderId(user._id);
  //     }
  //     else {
  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 2000);
  //     }
  //   };


    // useEffect( () => {
    //   console.log(`connections : ${userData.connections}`);
    //   console.log(`userData.receive_pending_connections : ${userData.receive_pending_connections}`);
    //   console.log(`userData.sent_pending_connections : ${userData.sent_pending_connections}`);
    //   console.log(`sender id : ${senderId}`)

    //   if(userData.connections.includes(senderId))  {
    //     console.log('already connected');
    //     setIsConnected(2);
    //   }
    //     else if(userData.receive_pending_connections.includes(senderId))  {
    //       console.log('pending');
    //       setIsConnected(1);
    //     }
    //     else
    //       {setIsConnected(0);}
    // }, []);

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
          // setIsConnected(true);
        } else {
          console.log(message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    
    }
    else{
      // handleAuth();
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
            {!userData.connections.includes(senderId) && !userData.receive_pending_connections.includes(senderId) && <span>  Connect  </span>}
            {!userData.connections.includes(senderId) && userData.receive_pending_connections.includes(senderId) && <span>  Pending  </span>}
            {userData.connections.includes(senderId) && <span>  Connected  </span>}
            {/* <span>{isConnected === true ? "Pending ": " Connect "}</span>   */}
            
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
