import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import "../styles/LoginForm.css";
import GoogleSignup from "../components/SignupFormComponent/GoogleSignup";
// Retrieve the API URL from environment variables
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Create an Axios instance with the base 
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Include cookies if needed
});
const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        "/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/feed");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      username: "",
      password: "",
    });
  };

  // const handleGoogleLogin = async(email, firstName, lastName)=> {
  //   try {
  //     const { data } = await api.post(
  //       "/LoginWithGoogle",
  //       {
  //         email, firstName, lastName
  //       },
  //       { withCredentials: true }
  //     );
      
  //     const { success, message } = data;
  //     if (success) {
  //       handleSuccess(message);
  //       setTimeout(() => {
  //         navigate("/myprofile");
          
  //       }, 1000);
  //     } else {
  //       handleError(message);
  //     }
  //   } catch (error) {
      
  //   }
  // }
  useEffect(() => {
    document.body.classList.add("login-body");
    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);


  return (
    <>
     <div className="login-wrapper">
    <div className="container login">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        
        <button type="submit">Sign in</button>
        <span>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
       
      </form>

      {/* <div className="google-login">
      <GoogleSignup handleGoogleLogin={handleGoogleLogin}/>
      </div> */}

    </div>
    </div>
      <ToastContainer /></>
  );
};

export default Login;