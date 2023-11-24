import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NotificationList from './NotificationList';

const Notification = () => {

    const [userData, setUserData] = useState("");
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [isBack, setIsBack] = useState(true);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadProfileData = async () => {
        if (!cookies.token) {
          navigate("/login");
        }
  
        try {
          const response = await axios.post(
            "http://localhost:4000/profile",
            {},
            { withCredentials: true }
          );
  
          const { status, user } = response.data;
  
          if (!status) {
            setTimeout(() => {
              navigate("/login");
            }, 0);
          } else {
            setUserData(user);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error loading user profile:", error);
 
        }
      };
  
      loadProfileData();
    }, [cookies.token, navigate]);


  return (
    <div>
      <NotificationList userId={userData._id}/>
    </div>
  )
}

export default Notification;
