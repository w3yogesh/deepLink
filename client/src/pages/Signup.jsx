import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import "../styles/SignUpForm.css";
import SignupStep1 from "../components/SignupFormComponent/SignupStep1";
import SignupStep2 from "../components/SignupFormComponent/SignupStep2";
import SignupStep3 from "../components/SignupFormComponent/SignupStep3";
import SignupStep4 from "../components/SignupFormComponent/SignupStep4";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    password: "",
    confirm_password: "",
    lastName: "",
    address: {
      country: "",
      city: "",
    },
    education: {
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    },
  });

  const updateForm = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const goNext = () => {

    if (curr === 0) {

  
      if (!formData.email) {
        toast.error("email is required");
        setCurr(0)
        return;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
        toast.error("Invalid email address");
        setCurr(0);
        return;
      }

      
      else if (formData.password !== formData.confirm_password) {
        toast.error("password and confirm password not matching");
        setCurr(0);
        return;
      }

    
      // else if (!/^[a-zA-Z0-9!@#$%^&*]{6,12}$/.test(formData.password)) {
      //   toast.error("Password should contain one Capital , one small, one special char, minlen=6, maxlen=12");
      //   setCurr(0);
      //   return;
      // }
    }

    if (curr === 1) {
      if (formData.firstName === "" || formData.lastName === "") {
        toast.error("required field");
        setCurr(1);
        return;
      }
    }

    if (curr === 2) {
      if (formData.address.country === "") {
        toast.error("required field");
        setCurr(2);
        return;
      }
    }

    if (curr === 3) {
      if (formData.education.institution === " " || formData.education.degree === " ") {
        toast.error("required field");
        setCurr(3);
        return;
      }
    }

    setCurr((prev) => prev + 1);
  };

  const steps = ["step 1", "step 2", "step 3", "step 4"];
  const [curr, setCurr] = useState(0);

  const goBack = () => {
    setCurr((prev) => prev - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    console.log("Submitting form data to the backend:", formData);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          formData,
        },
        { withCredentials: true }
      );
      console.log("After Api");
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
      console.log(error);
    }
  };

  return (
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

      <ToastContainer />
    </div>
  );
};

export default Signup;