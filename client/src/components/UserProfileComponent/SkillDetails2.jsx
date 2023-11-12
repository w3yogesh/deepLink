import { React, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const SkillDetails2 = ({ userData, setUserData }) => {
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "",
  });


  return (
           <>
          <div className="all-educations">
            {userData.skill.map((skl, index) => (
              <div key={index} style={{ border: "1px solid black" }}>
                <h5>Skill: {skl.name}</h5>
                <p>Level: {skl.level}</p>
              </div>
            ))}
          </div>
        </>
  );
};

export default SkillDetails2;
