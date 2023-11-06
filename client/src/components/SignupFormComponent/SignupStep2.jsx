import React from "react";
import { TextField } from "@mui/material";

const SignupStep2 = ({ formData, updateForm }) => {

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateForm({ [name]: value });
  };

  return (
    <div>
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
    </div>
  );
};

export default SignupStep2;
