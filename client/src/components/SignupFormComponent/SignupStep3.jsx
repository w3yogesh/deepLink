import React from "react";
import { TextField } from "@mui/material";
import { useEffect } from "react";
const SignupStep3 = ({ formData, updateForm }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateForm({
      address: {
        ...formData.address,
        [name]: value,
      },
    });
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
        label="Country"
        variant="outlined"
        fullWidth
        name="country"
        value={formData.address.country}
        onChange={handleChange}
      />
      <TextField
        label="City"
        variant="outlined"
        fullWidth
        name="city"
        value={formData.address.city}
        onChange={handleChange}
      />
    </div>
  );
};

export default SignupStep3;
