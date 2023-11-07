import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ProfileUpdateForm = ({ userId, userData, setUserData, setShowForm}) => {

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      // Make a PUT or PATCH request to update the user's data
      const response = await axios.put(
        "http://localhost:4000/updateUserProfile",
        {
          userId: userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
        }
      );

      if (response.data.success) {
        toast(response.data.message, {
          position: "top-right",
        });
      } else {
        console.log(response.data.message);
        toast(response.data.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast("Server error", {
        position: "top-right",
      });
    }
  };

  const goBack = () => {
    setUserData(userData)
    setShowForm(false)
  }

  return (
    <div style={{maxWidth : '300px', margin : '0px auto', marginTop : '15px'}}>
      <TextField
        label="firstName"
        variant="outlined"
        fullWidth
        name="firstName"
        value={userData.firstName}
        onChange={handleChange}
      />
      <TextField
        label="lastName"
        variant="outlined"
        fullWidth
        name="lastName"
        value={userData.lastName}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleUpdate}> upadte this </Button>
      <Button variant="contained" onClick={goBack}> Go Back </Button>
      <ToastContainer />
    </div>
  );
};

export default ProfileUpdateForm;
