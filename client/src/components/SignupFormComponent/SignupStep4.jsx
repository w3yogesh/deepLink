import React, { useEffect } from "react";

const SignupStep4 = ({ formData, updateForm }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateForm({
      education: {
        ...formData.education,
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
      <label>Institution Name</label>
      <input
        type="text"
        name="institution"
        value={formData.education.institution}
        onChange={handleChange}
      />
      <label>Degree</label>
      <input
        type="text"
        name="degree"
        value={formData.education.degree}
        onChange={handleChange}
      />
      <label>Field of study</label>
      <input
        type="text"
        name="field"
        value={formData.education.field}
        onChange={handleChange}
      />

      <div>
        <label>Starting Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.education.startDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Ending Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.education.endDate}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SignupStep4;
