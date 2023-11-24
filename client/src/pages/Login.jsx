import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import "../styles/LoginForm.css";
import GoogleSignup from "../components/SignupFormComponent/GoogleSignup";

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
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
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

  const handleGoogleLogin = async(email, firstName, lastName)=> {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/LoginWithGoogle",
        {
          email, firstName, lastName
        },
        { withCredentials: true }
      );
      
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/myprofile");
          
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
<<<<<<< HEAD
    document.body.classList.add("login-body");
=======
   
    document.body.classList.add("login-body");
  
 
>>>>>>> 6bb6fed5a362b3db9fe2a14cc6274e06759e6138
    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);


  return (
    <div className="form_container">
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
        
        <button type="submit">Submit</button>
<<<<<<< HEAD
        <span>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
=======
       
>>>>>>> 6bb6fed5a362b3db9fe2a14cc6274e06759e6138
      </form>

      <GoogleSignup handleGoogleLogin={handleGoogleLogin}/>

      <ToastContainer />
    </div>
  );
};

export default Login;