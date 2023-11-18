import React, { useState } from "react";
import { toast } from "react-toastify";
import { ArrowDown,DeleteIcon, CancelIcon,SaveIcon,EditIcon,AddIcon } from "../MySVGIcons";
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
  const [isEditMode, setIsEditMode] = useState(true);
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
    <div className="experience-details details">
      {!showForm && (
        <>
          <div className="edit-details" onClick={() => {
                setShowForm(true);
              }}>
       
              <AddIcon />
           
          </div>
          <div className="form-container">
            <div className="experience-info-section">
              <h4>Add Experience</h4>
            </div>
          </div>
        </>
      )}

      {showForm && (
        <>
          <div className="edit-details" onClick={() => {
                setShowForm(false);
              }}>
            
              <CancelIcon />
       
          </div>
          <div className="edit-details" onClick={() => {
             
                  handleAddExperience();
              
              }}>
               <SaveIcon />
       
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
            
          </div>
        </>
      )}
      <div className="all-experience">
              {userData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="edit-details" onClick={()=>handleDeleteExperience(exp._id)}>
                    
                      <DeleteIcon />
                
                  </div>
                  <div className="edit-details" onClick={()=>handleEditExperience(exp._id)}>
                    
                      <EditIcon />
                    
                  </div>

                
                  
                  <div className="company-title">
                    <h4 className="company-heading">
                      <span className="exp-label">Company Name:</span><b>{exp.companyName}</b>
                    </h4>
                  </div>
                  <div className="employment-type">
                    <span className="exp-label">Employement Type:</span>
                    <span> <b>{exp.employmentType}</b></span>
                  </div>
                  <div className="compnay-location">
                    <span className="exp-label">Location: </span> 
                    <span><b>{exp.location}</b></span>
                  </div>
                  <div className="experience-description">
                    <span className="exp-label">Description: </span><span><b>{exp.description}</b></span>
                  </div>
                  <div className="date">
                    <span className="exp-label">startDate: </span>
                      <span><b>{formatDateFromLong(exp.startDate)}</b></span><br></br>
                    <span className="exp-label">endDate:</span>
                    <span><b>{exp.endDate ? formatDateFromLong(exp.endDate) : 'Present'}</b></span>
                  </div>
                </div>
              ))}
            </div>
    </div>
  );
};

export default ExperienceDetails;
