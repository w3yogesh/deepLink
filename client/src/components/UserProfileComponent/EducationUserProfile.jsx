import React from "react";

export const EducationUserProfile = ({ userData}) => {
  function formatDateFromLong(dateInLong) {
    const date = new Date(dateInLong);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  }
  return (
    <>
      {userData.education.map((edu, index) => (
        <div
          key={index}
          className={index % 2 === 0 ? "even-education" : "odd-education"}
        >
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
                {formatDateFromLong(edu.endDate)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
