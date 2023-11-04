import React from 'react';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
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
        const { status, user } = data;
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
                <button onClick={Logout}>LOGOUT</button>
                    


                <ToastContainer />
            </>
            
          )
    }
 
}

export default Dashboard;