import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from '@mui/icons-material/Delete';

import axios from "axios";

const EducationDetails = ({ userData, setUserData }) => {
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    grade: "",
    startDate: "",
    endDate: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEducation = async () => {
    // console.log(userData._id);
    if (
      newEducation.institution === "" ||
      newEducation.degree === "" ||
      newEducation.field === "" ||
      newEducation.grade === ""
    )
      return;
    setUserData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
    console.log(newEducation.endDate);
    console.log(userData.education);
    const response = await axios.put("http://localhost:4000/updateEducation", {
      userId: userData._id,
      institution: newEducation.institution,
      degree: newEducation.degree,
      field: newEducation.field,
      grade: newEducation.grade,
      startDate: newEducation.startDate,
      endDate: newEducation.endDate,
    });
    console.log(response.data);
  };
  // const handleDeleteEducation = async(eduId) => {
  //     const response = await axios.delete(`http://localhost:4000/deleteEducation${eduId}`)
  //     console.log(response);
  // }

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
              <AddCircleIcon />
            </svg>
          </div>
          <div className="form-container">
            <div className="education-info-section">
              <h4>Add Education</h4>
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
                  handleAddEducation();
                }
                setIsEditMode(!isEditMode);
              }}
            >
              {!isEditMode && <EditIcon />}
              {isEditMode && <SaveIcon />}
            </svg>
          </div>
          <div className="form-container">
            <form action="">
              <div className="education-info-section">
                <h4>Add Education</h4>
                <div className="form-row">
                  <div className="form-data">
                    <label htmlFor="institution">Institute</label>
                    <input
                      type="text"
                      name="institution"
                      onChange={handleChange}
                      value={newEducation.institution}
                      disabled={!isEditMode}
                      required
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="degree">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={newEducation.degree}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-data">
                    <label htmlFor="studyfield">Field of study</label>
                    <input
                      type="text"
                      name="field"
                      value={newEducation.field}
                      onChange={handleChange}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="grade">Grade</label>
                    <input
                      type="text"
                      name="grade"
                      value={newEducation.grade}
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
                      value={newEducation.startDate}
                      onChange={handleChange}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newEducation.endDate}
                      onChange={handleChange}
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="all-educations">
              {userData.education.map((edu, index) => (
                <div key={index} style={{ border: "1px solid black" }}>
                  <div className="edit-details">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="50px"
                      height="50px"
                      // onClick={handleDeleteEducation(edu._id)}
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
                      onClick={() => {
                        if (isEditMode) {
                          // handleAddEducation();
                        }
                        setIsEditMode(!isEditMode);
                      }}
                    >
                      {!isEditMode && <EditIcon />}
                      {isEditMode && <SaveIcon />}
                    </svg>
                  </div>
                  
                  <div className="institution">
                    <h4 className="institution-heading">
                      Institution: <b>{edu.institution}</b>
                    </h4>
                  </div>
                  <div className="degree">
                    <p>
                      Degree: <b>{edu.degree}</b>
                    </p>
                  </div>
                  <div className="field">
                    <p>
                      Field of Study: <b>{edu.field}</b>
                    </p>
                  </div>
                  <div className="grade">
                    <p>
                      Grade: <b>{edu.grade}</b>
                    </p>
                  </div>
                  <div className="date">
                    <span>
                      <p>
                        startDate: <b>{edu.startDate}</b>
                      </p>
                    </span>{" "}
                    <span>
                      {" "}
                      <p>
                        endDate: <b>{edu.endDate}</b>
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

export default EducationDetails;
