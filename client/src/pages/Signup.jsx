import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/SignUpForm.css";
import SignupStep1 from "../components/SignupFormComponent/SignupStep1";
import SignupStep2 from "../components/SignupFormComponent/SignupStep2";
import SignupStep3 from "../components/SignupFormComponent/SignupStep3";

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
    // Validation logic...

    setCurr((prev) => prev + 1);
  };

  const steps = ["email & password", "name", "address"];
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
      navigate("/signup");
      console.log(error);
    }
  };

  return (
    <div className="signup-body">
      <div className="container signup">
        <h2> Signup </h2>

        <div className="stepper">
          {steps.map((label, index) => (
            <div key={label} className={`step ${curr === index ? "active" : ""}`}>
              {label}
            </div>
          ))}
        </div>

        <div style={{ padding: "20px" }}>
          {curr === steps.length ? (
            <div>
              <p>All steps completed</p>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          ) : (
            <div>
              <p>{steps[curr]}</p>
              {curr === 0 && <SignupStep1 formData={formData} updateForm={updateForm} />}
              {curr === 1 && <SignupStep2 formData={formData} updateForm={updateForm} />}
              {curr === 2 && <SignupStep3 formData={formData} updateForm={updateForm} />}
              <button disabled={curr === 0} onClick={goBack} className="back-btn">
                Back
              </button>
              <button className="next-btn" onClick={goNext}>
                Next
              </button>
            </div>
          )}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
