import React from "react";
import { TextField } from "@mui/material";
import { useEffect } from "react";
const SignupStep1 = ({ formData, updateForm }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateForm({ [name]: value });
  };

  useEffect(() => {
    // Add a class to the body element to apply specific styles
    document.body.classList.add("login-body");
  
    // Remove the class when the component unmounts
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
    </div>
  );
};

export default SignupStep1;
