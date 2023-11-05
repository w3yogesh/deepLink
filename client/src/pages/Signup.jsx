import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/SignUpForm.css";
import SignupStep1 from "../components/SignupStep1";
import SignupStep2 from "../components/SignupStep2";
import SignupStep3 from "../components/SignupStep3";
import SignupStep4 from "../components/SignupStep4";

const Signup = () => {
  const navigate = useNavigate();

  // const [photo, setphoto] = useState(null);

  // const handleFileChange = (event) => {
  //   setphoto(event.target.files[0]);
  // };
  // const [values, setValues] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   photo: "",
  // });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // const handleChange = (event) => {
  //   setValues({ ...values, [event.target.name]: event.target.value });
  // };

  // const handleValidation = () => {
  //   const { username, email, password, confirmPassword } = values;
  //   if (password !== confirmPassword) {
  //     toast.error("password and confirm should be same.", toastOptions);
  //     return false;
  //   } else if (username.length < 4) {
  //     toast.error(
  //       "Username should be greater than 3 characters.",
  //       toastOptions
  //     );
  //     return false;
  //   } else if (password.length < 4) {
  //     toast.error(
  //       "Password should be equal or greater than 8 characters.",
  //       toastOptions
  //     );
  //     return false;
  //   } else if (email === "") {
  //     toast.error("Email is required.", toastOptions);
  //     return false;
  //   }
  //   return true;
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (handleValidation()) {
  //     const { username, email, password } = values;
  //     const formData = new FormData();
  //     formData.append("photo", photo);
  //     formData.append("username", username); // Add other form fields to FormData
  //     formData.append("email", email);
  //     formData.append("password", password);
  //     const { data } = await axios.post(
  //       `http://localhost:4000/signup`,
  //       formData
  //     );
  //     if (data.status === false) {
  //       toast.error(data.msg, toastOptions);
  //     }
  //     // if(data.status===true){
  //     //   sessionStorage.setItem("signupdata",data.user);
  //     //   <Navigate to="/login"/>

  //     // }
  //     navigate("/dashboard");
  //   }
  // };

  const steps = ["step 1", "step 2", "step 3", "step 4"];
  const [curr, setCurr] = useState(0);

  const goNext = () => {
    setCurr((prev) => prev + 1);
  };
  const goBack = () => {
    setCurr((prev) => prev - 1);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    address: {
      country: "",
      state: "",
      city: "",
      zipCode: "",
    },
    institution: "",
    educationLevel: "",
  });

  const updateForm = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send the formData to the backend API here
    console.log("Submitting form data to the backend:", formData);
  };

  return (
    // <div>
    //   <title>Signup Page</title>

    //   <div className="container">
    //     <h2>Signup</h2>

    //     <form onSubmit={(event)=>handleSubmit(event)} >
    //   <div className="form-group">
    //     <label htmlFor="username">Username</label>
    //     <input type="text"  id="username" placeholder="Enter your username" name='username'
    //     onChange={(event)=>handleChange(event)}/>
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="email">Email</label>
    //     <input type="email"  id="email" placeholder="Enter your email" name='email'
    //     onChange={(event)=>handleChange(event)}/>
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="password">Password</label>
    //     <input type="password"  id="password" placeholder="Enter your password" name='password'
    //     onChange={(event)=>handleChange(event)}/>
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="confirmPassword">ConfirmPassword</label>
    //     <input type="password"  id="confirmPassword" placeholder="Enter your password again" name='confirmPassword'
    //     onChange={(event)=>handleChange(event)}/>
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="photo">upload your photo</label>
    //     <input type="file"  id="photo"  name='file'
    //     onChange={(event)=>handleFileChange(event)}/>
    //   </div>
    //   <div className="form-group">
    //     <button  type="submit">signup</button>
    //     <span>
    //       already have an account <Link to="/login">login here</Link>
    //     </span>
    //   </div>
    // </form>
    // </div>

    // <ToastContainer />
    // </div>

    <div className="container">
      <title> signup </title>
      <h2> Signup </h2>

      <Stepper activeStep={curr} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Paper style={{ padding: "20px" }}>
        {curr === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        ) : (
          <div>
            <Typography>{steps[curr]}</Typography>
            {curr === 0 && (
              <SignupStep1 formData={formData} updateForm={updateForm} />
            )}
            {curr === 1 && (
              <SignupStep2 formData={formData} updateForm={updateForm} />
            )}
            {curr === 2 && (
              <SignupStep3 formData={formData} updateForm={updateForm} />
            )}
            {curr === 3 && (
              <SignupStep4 formData={formData} updateForm={updateForm} />
            )}
            <Button disabled={curr === 0} onClick={goBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={goNext}>
              Next
            </Button>
          </div>
        )}
      </Paper>


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const { email, username, password, confirm_password } = inputValue;
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
      position: "bottom-right",
    });

    const handleValidation = ()=>{
      const{username,email,password,confirm_password} = inputValue;
      if(password!==confirm_password){
        toast.error("password and confirm should be same.",
        handleError)
        return false;
      } else if(username.length<4){
        toast.error(
          "Username should be greater than 3 characters.",
          handleError
        );
        return false;
      }else if(password.length<4){
        toast.error(
          "Password should be equal or greater than 8 characters.",
          handleError
        );
        return false;
      }else if (email === "") {
        toast.error("Email is required.", handleError);
        return false;
      }
      return true;
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()){
      try {
        const { data } = await axios.post(
          "http://localhost:4000/signup",
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          handleError(message);
        }
      
      } catch (error) {
        console.log(error);
      }
  }
    setInputValue({
      ...inputValue,
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
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
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
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
        <div>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={confirm_password}
            placeholder="Enter your confirm password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
};


export default Signup;