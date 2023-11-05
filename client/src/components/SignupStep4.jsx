import React from "react";
import { TextField } from "@mui/material";

const SignupStep4 = ({ formData, updateForm }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateForm({ [name]: value });
  };

  return (
    <div>
      <TextField label="Education Level" variant="outlined" fullWidth />
    </div>
  );
};

export default SignupStep4;
