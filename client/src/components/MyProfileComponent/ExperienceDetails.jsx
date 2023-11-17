import React, { useState } from "react";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import axios from "axios";

const ExperienceDetails = ({ userData, setUserData }) => {

    function formatDateFromLong(dateInLong) {
        const date = new Date(dateInLong);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
        const day = date.getDate().toString().padStart(2, "0");
    
        return `${day}/${month}/${year}`;
      }

  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newExperience, setNewExperience] = useState({
    companyName:"",
    employmentType:"",
    location:"",
    description:"",
    startDate:"",
    endDate:"",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleError = (err) =>
  toast.error(err, {
    position: "bottom-left",
  });
const handleSuccess = (msg) =>
  toast.success(msg, {
    position: "bottom-left",
  });

  const handleAddExperience = async () => {
    // console.log(userData._id);
    if (
     setNewExperience.companyName === "" ||
     setNewExperience.employmentType === "" ||
     setNewExperience.location === "" ||
     setNewExperience.description === ""
    )
      return;
    setUserData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));

    const response = await axios.put("http://localhost:4000/updateExperience", {
      userId: userData._id,
      companyName: newExperience.companyName,
      employmentType: newExperience.employmentType,
      location: newExperience.location,
      description: newExperience.description,
      startDate: newExperience.startDate,
      endDate: newExperience.endDate,
    });
    if (response.data.success) {
      handleSuccess(response.data.message);
    } else {
      handleError(response.data.message);
    }
  };
  const handleDeleteExperience = async(expId) => {
      const response = await axios.delete(`http://localhost:4000/deleteExperience${expId}`)
      if (response.data.success) {
        handleSuccess(response.data.message);
      } else {
        handleError(response.data.message);
      }
  }

  const handleEditExperience= async(expId)  => {
    const experienceToEdit = userData.experience.find((exp) => exp._id === expId);

    setNewExperience(experienceToEdit);

    setIsEditMode(true);
    setShowForm(true);
  }

  return (
    <div className="education-details details">
      {!showForm && (
        <>
          <div className="edit-details">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
              onClick={() => {
                setShowForm(true);
              }}
            >
              <ArrowDropDownCircleIcon />
            </svg>
          </div>
          <div className="form-container">
            <div className="education-info-section">
              <h4>Add Experience</h4>
            </div>
          </div>
        </>
      )}

      {showForm && (
        <>
          <div className="edit-details">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
              onClick={() => {
                setShowForm(false);
              }}
            >
              <CancelIcon />
            </svg>
          </div>
          <div className="edit-details">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
              onClick={() => {
                if (isEditMode) {
                  handleAddExperience();
                }
                setIsEditMode(!isEditMode);
              }}
            >
              {!isEditMode && <AddCircleIcon />}
              {isEditMode && <SaveIcon />}
            </svg>
          </div>
          <div className="form-container">
            <form action="">
              <div className="education-info-section">
                <h4>Add Experience</h4>
                <div className="form-row">
                  <div className="form-data">
                    <label htmlFor="institution">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      onChange={handleChange}
                      value={newExperience.companyName}
                      disabled={!isEditMode}
                      required
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="degree">Employment Type</label>
                    <input
                      type="text"
                      name="employmentType"
                      value={newExperience.employmentType}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-data">
                    <label htmlFor="studyfield">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={newExperience.location}
                      onChange={handleChange}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="grade">Description</label>
                    <input
                      type="text"
                      name="description"
                      value={newExperience.description}
                      onChange={handleChange}
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-data">
                    <label htmlFor="startDate">Start date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newExperience.startDate}
                      onChange={handleChange}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newExperience.endDate}
                      onChange={handleChange}
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="all-educations">
              {userData.experience.map((exp, index) => (
                <div key={index} style={{ border: "1px solid black" }}>
                  <div className="edit-details">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="50px"
                      height="50px"
                      onClick={()=>handleDeleteExperience(exp._id)}
                    >
                      <DeleteIcon />
                    </svg>
                  </div>

                  <div className="edit-details">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="50px"
                      height="50px"
                      onClick={()=>handleEditExperience(exp._id)}
                    >
                      <EditIcon />
                    </svg>
                  </div>

                  <div className="edit-details">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="50px"
                      height="50px"
                      onClick={() => {
                        if (isEditMode) {
                          // handleAddEducation();
                        }
                        setIsEditMode(!isEditMode);
                      }}
                    >
                      {!isEditMode && <EditIcon />}
                      {isEditMode && <SaveIcon />}
                    </svg> */}
                  </div>
                  
                  <div className="institution">
                    <h4 className="institution-heading">
                      Company Name: <b>{exp.companyName}</b>
                    </h4>
                  </div>
                  <div className="degree">
                    <p>
                    Employement Type: <b>{exp.employmentType}</b>
                    </p>
                  </div>
                  <div className="field">
                    <p>
                      Location: <b>{exp.location}</b>
                    </p>
                  </div>
                  <div className="grade">
                    <p>
                      Description: <b>{exp.description}</b>
                    </p>
                  </div>
                  <div className="date">
                    <span>
                      <p>
                        startDate: <b>{formatDateFromLong(exp.startDate)}</b>
                      </p>
                    </span>{" "}
                    <span>
                      {" "}
                      <p>
                        endDate: <b>{formatDateFromLong(exp.endDate)}</b>
                      </p>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExperienceDetails;
