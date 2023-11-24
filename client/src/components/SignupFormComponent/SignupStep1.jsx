import React from "react";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const SignupStep1 = ({ formData, updateForm }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateForm({ [name]: value });
  };

  useEffect(() => {
   
    document.body.classList.add("login-body");

    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);

  return (
    <div>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        name="confirm_password"
        value={formData.confirm_password}
        onChange={handleChange}
      />
       <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
    </div>
  );
};

export default SignupStep1;
