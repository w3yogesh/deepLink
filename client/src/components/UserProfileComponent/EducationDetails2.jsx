import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const EducationDetails2 = ({ userData, setUserData }) => {
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

  return (
    <div className="education-details details">
      {(
        <>
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

export default EducationDetails2;
