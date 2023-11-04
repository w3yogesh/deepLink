import React from 'react';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import ProfilePicture from './ProfilePicture';
import Header from './Header';
import Summary from './Summary';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';


const Profile = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [Data, setData] = useState("");

    useEffect(() => {
      const verifyCookie = async () => {
        // if (!cookies.token) {
        //   navigate("/login");
        // }
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user} = data;
        setData(data);
        setUsername(user);
        return status
          ? toast(`Hello ${user}`, {
              position: "top-right",
            })
          : (removeCookie("token"), navigate("/login"));
      };
      verifyCookie();
    }, [cookies, navigate, removeCookie]);
    const Logout = () => {
      removeCookie("token");
      navigate("/");
    };

    if (!cookies.token) {
        return(<div>not login</div>)
    }else{
        return (
          
            <>
              <div className="profile">
        <ProfilePicture />
        <Header />
        <Summary />
        <Experience />
        <Education />
        <Skills />
      </div>
                <h1>{Data.email}</h1>

                <button onClick={Logout}>LOGOUT</button>
                    
              

                <ToastContainer />
            </>
            
          )
    }
 
}

export default Profile;