import { React, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ArrowDown,
  DeleteIcon,
  CancelIcon,
  SaveIcon,
  EditIcon,
  AddIcon,
} from "../MySVGIcons";

const SkillDetails = ({ userData, setUserData }) => {
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "",
  });
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewSkill((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = async () => {
    if (newSkill.skillName === "" || newSkill.skillLevel === "") return;
    setUserData((prev) => ({
      ...prev,
      skill: [...prev.skill, newSkill],
    }));
    console.log(userData);
    const response = await axios.put("http://localhost:4000/updateSkill", {
      userId: userData._id,
      skillName: newSkill.skillName,
      skillLevel: newSkill.skillLevel,
    });
    if (response.data.success) {
      handleSuccess(response.data.message);
    } else {
      handleError(response.data.message);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    const response = await axios.delete(
      `http://localhost:4000/deleteSkill${skillId}`
    );
    //console.log(response.data);
    const { success, message } = response.data;
    if (success) {
      handleSuccess(message);
    } else {
      handleError(message);
    }
  };

  const handleEditSkill = async (skillId) => {
    const skillToEdit = userData.skill.find((skl) => skl._id === skillId);
    setNewSkill(skillToEdit);

    setIsEditMode(true);
    setShowForm(true);
  };

  // console.log(userData);
  return (
    <div className="Skill-details details">
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
            <div className="Skill-info-section">
              <h4>Add Skill</h4>
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
              handleAddSkill();
            }}
          >
            <SaveIcon />
          </div>
          <div className="form-container">
            <form action="">
              <div className="Skill-info-section">
                <h4>Add Skill</h4>
                <div className="form-row">
                  <div className="form-data">
                    <label htmlFor="skill_name">Skill Name</label>
                    <input
                      type="text"
                      name="skillName"
                      value={newSkill.skillName}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      required
                    />
                  </div>
                  <div className="form-data">
                    <label htmlFor="skill_level">Skill Level</label>
                    <select
                      name="skillLevel"
                      onChange={handleChange}
                      value={newSkill.skillLevel}
                      disabled={!isEditMode}
                      required
                    >
                      <option>Select Skill Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
      <div className="all-skills">
        {userData.skill.map((skl, index) => (
          <div key={index} className="all-skills-list"> 
            <div className="skill-details">
              <div className="skill-name"><span className="skill-label"> Skill: </span> <span className="skil-name">{skl.skillName}</span></div>
              <div className="skill-lavel"><span className="skill-label">Level: </span> <span className="skil-level">{skl.skillLevel}</span></div>
            </div>
            <div className="skill-action">
           <div
              className="edit-details"
              onClick={() => handleDeleteSkill(skl._id)}
            >
              <DeleteIcon />
            </div>
            <div
              className="edit-details"
              onClick={() => handleEditSkill(skl._id)}
            >
              <EditIcon />
            </div>

           </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillDetails;
