import React from "react";

export const ExperienceUserProfile = ({ userData}) => {
  function formatDateFromLong(dateInLong) {
    const date = new Date(dateInLong);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  }
  return (
    <>
      {userData.experience.map((exp, index) => (
        <div
          key={index}
          className={index % 2 === 0 ? "even-education" : "odd-education"}
        >
          <div className="user-label">
            <span className="user-label-tag">Company Name:</span>
            <span className="user-label-value">{exp.companyName}</span>
          </div>
          <div className="user-label">
            <span className="user-label-tag">Employement Type:</span>
            <span className="user-label-value">{exp.employmentType}</span>
          </div>
          <div className="user-label">
            <span className="user-label-tag">Location:</span>
            <span className="user-label-value">{exp.location}</span>
          </div>
          <div className="user-label">
            <span className="user-label-tag">Description:</span>
            <span className="user-label-value">{exp.description}</span>
          </div>
          <div className="user-label">
            <div className="sDate">
              <span className="user-label-tag">Start Date:</span>
              <span className="user-label-value">
                {formatDateFromLong(exp.startDate)}
              </span>
            </div>
            <div className="eDate">
              <span className="user-label-tag">End Date:</span>
              <span className="user-label-value">
                {formatDateFromLong(exp.endDate)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
