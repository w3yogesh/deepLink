import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

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
  console.log(userData);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEducation = () => {
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
    // console.log(`new user : ${newEducation}`);
    console.log(userData.education);
  };

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
          </div>
          <div className="all-educations">
            {userData.education.map((edu, index) => (
              <div key={index} style={{border:'1px solid black'}}>
                <h5>Institution: {edu.institution}</h5>
                <p>Degree: {edu.degree}</p>
                <p>Field of Study: {edu.field}</p>
                <p>Grade: {edu.grade}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EducationDetails;
