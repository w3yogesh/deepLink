import React from "react";
import { TextField } from "@mui/material";

const SignupStep1 = ({ formData, updateForm }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateForm({ [name]: value });
  };

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
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
    </div>
  );
};

export default SignupStep1;
