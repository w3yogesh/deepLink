import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,Link, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/SignUpForm.css';


function Signup() {
  const navigate = useNavigate();

  const[values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event)=>{
    setValues({...values,[event.target.name]:event.target.value});
  }

  const handleValidation = ()=>{
    const{username,email,password,confirmPassword} = values;
    if(password!==confirmPassword){
      toast.error("password and confirm should be same.",
      toastOptions)
      return false;
    } else if(username.length<4){
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    }else if(password.length<4){
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    }else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  }

const handleSubmit = async(event)=>{
  event.preventDefault();
  if(handleValidation()){
    const  {username,email,password} = values;
    const formData = new FormData();
      formData.append('username', username); // Add other form fields to FormData
      formData.append('email', email);
      formData.append('password', password);
    const {data} = await axios.post(`http://localhost:4000/signup`,formData)
    if(data.status===false){
      toast.error(data.msg,toastOptions);
    }
    // if(data.status===true){
    //   sessionStorage.setItem("signupdata",data.user);
    //   <Navigate to="/login"/>
      
    // }
    navigate("/dashboard")

  }
  
}

  return (
    <div>

  <title>Signup Page</title>

  <div className="container">
    <h2>Signup</h2>
    <form onSubmit={(event)=>handleSubmit(event)} >
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text"  id="username" placeholder="Enter your username" name='username'
        onChange={(event)=>handleChange(event)}/>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email"  id="email" placeholder="Enter your email" name='email'
        onChange={(event)=>handleChange(event)}/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password"  id="password" placeholder="Enter your password" name='password'
        onChange={(event)=>handleChange(event)}/>
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">ConfirmPassword</label>
        <input type="password"  id="confirmPassword" placeholder="Enter your password again" name='confirmPassword'
        onChange={(event)=>handleChange(event)}/>
      </div>
      <div className="form-group">
        <button  type="submit">signup</button>
        <span>
          already have an account <Link to="/login">login here</Link>
        </span>
      </div>
    </form>
  </div>
  <ToastContainer/>
    </div>
  )
}

export  default Signup