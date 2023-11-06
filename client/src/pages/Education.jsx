// components/Education.js
import React from 'react';

const Education = () => {
  return (
    <div>
      <h2>Education</h2>
      <EducationItem
        institution="MNNIT"
        degree="Master's in Computer Application"
        cgpa="8.2"
        year="2022 - 2025"
      />
    
    </div>
  );
};

const EducationItem = ({ institution,degree,cgpa,year, }) => {
  return (
    <div>
      <h3>{institution}</h3>
      <p>Degree:{degree}</p>
      <p>CGPA:{cgpa}</p>
      <p>Year:{year}</p>
    </div>
  );
};

export default Education;
