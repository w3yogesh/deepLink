import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  DeleteIcon,
  CancelIcon,
  SaveIcon,
  EditIcon,
  AddIcon,
} from "../MySVGIcons";
import axios from "axios";

const EducationDetails = ({ userData, setUserData }) => {
  function formatDateFromLong(dateInLong, updateMode) {
    const date = new Date(dateInLong);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");
    if (updateMode) {
      return `${year}-${month}-${day}`;
    } else {
      return `${day}/${month}/${year}`;
    }
  }
  // git issue
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [updateMode, setUpdateMode] = useState(false);
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

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleAddEducation = async () => {
    // console.log(userData._id);
    if (
      newEducation.institution === "" ||
      newEducation.degree === "" ||
      newEducation.field === "" ||
      newEducation.grade === "" ||
      newEducation.startDate === "" ||
      newEducation.endDate === ""
    )
      return;

    if (new Date(newEducation.startDate) >= new Date(newEducation.endDate)) {
      handleError("end date must be after start date");
      return;
    }

    if (updateMode) {
      const response = await axios.put("http://localhost:4000/editEducation", {
        eduId: newEducation._id,
        institution: newEducation.institution,
        degree: newEducation.degree,
        field: newEducation.field,
        grade: newEducation.grade,
        startDate: newEducation.startDate,
        endDate: newEducation.endDate,
      });
      const { success, message } = response.data;
      if (success) {
        handleSuccess(message);
        setUpdateMode(false);
        setUserData((prevUserData) => {
          const updatedEducation = prevUserData.education.map((edu) =>
            edu._id === newEducation._id ? newEducation : edu
          );

          return {
            ...prevUserData,
            education: updatedEducation,
          };
        });
      } else {
        handleError(message);
      }
    } else {
      const response = await axios.put("http://localhost:4000/addEducation", {
        userId: userData._id,
        institution: newEducation.institution,
        degree: newEducation.degree,
        field: newEducation.field,
        grade: newEducation.grade,
        startDate: newEducation.startDate,
        endDate: newEducation.endDate,
      });
      const { success, message } = response.data;
      if (success) {
        handleSuccess(message);
        setUserData((prev) => ({
          ...prev,
          education: [...prev.education, newEducation],
        }));
      } else {
        handleError(message);
      }
    }
  };

  const handleDeleteEducation = async (eduId) => {
    const response = await axios.delete(
      `http://localhost:4000/deleteEducation${eduId}`
    );
    if (response.data.success) {
      handleSuccess(response.data.message);
      setUserData((prevUserData) => {
        const updatedEducation = prevUserData.education.filter(
          (edu) => edu._id !== eduId
        );

        return {
          ...prevUserData,
          education: updatedEducation,
        };
      });
    } else {
      handleError(response.data.message);
    }
  };

  const handleEditEducation = async (eduId) => {
    const educationToEdit = userData.education.find((edu) => edu._id === eduId);
    console.log(educationToEdit);
    setNewEducation(educationToEdit);
    setUpdateMode(true);
    setIsEditMode(true);
    setShowForm(true);
  };

  return (
    <div className="education-details details">
      {!showForm && (
        <>
          <div
            className="edit-details"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <AddIcon />
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
          <div
            className="edit-details"
            onClick={() => {
              setShowForm(false);
            }}
          >
            <CancelIcon />
          </div>
          <div
            className="edit-details"
            onClick={() => {
              handleAddEducation();
            }}
          >
            <SaveIcon />
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
                      // value={newEducation.startDate}
                      value={
                        updateMode
                          ? formatDateFromLong(
                              newEducation.startDate,
                              updateMode
                            )
                          : newEducation.startDate
                      }
                      onChange={handleChange}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      // value={newEducation.endDate}
                      value={
                        updateMode
                          ? formatDateFromLong(newEducation.endDate, updateMode)
                          : newEducation.endDate
                      }
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
      <div className="all-educations">
        {userData.education.map((edu, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? "even-education" : "odd-education"}
          >
            <div className="educations-action">
              <div
                className="edit-details"
                onClick={() => handleDeleteEducation(edu._id)}
              >
                <DeleteIcon />
              </div>
              <div
                className="edit-details"
                onClick={() => handleEditEducation(edu._id)}
              >
                <EditIcon />
              </div>
            </div>

            <div className="user-label">
              <span className="user-label-tag">Institution:</span>
              <span className="user-label-value">{edu.institution}</span>
            </div>
            <div className="user-label">
              <span className="user-label-tag">Field:</span>
              <span className="user-label-value">{edu.field}</span>
            </div>
            <div className="user-label">
              <span className="user-label-tag">Degree:</span>
              <span className="user-label-value">{edu.degree}</span>
            </div>
            <div className="user-label">
              <span className="user-label-tag">Grade:</span>
              <span className="user-label-value">{edu.grade}</span>
            </div>
            <div className="user-label">
              <div className="sDate">
                <span className="user-label-tag">Start Date:</span>
                <span className="user-label-value">
                  {formatDateFromLong(edu.startDate)}
                </span>
              </div>
              <div className="eDate">
                <span className="user-label-tag">End Date:</span>
                <span className="user-label-value">
                  {edu.endDate ? formatDateFromLong(edu.endDate) : "Present"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationDetails;
