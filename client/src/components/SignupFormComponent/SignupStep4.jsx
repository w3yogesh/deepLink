import React from "react";
import { TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

  return (
    <div>
      {/* school, degree, field of study, start date, end date */}
      <TextField
        label="Institution Name"
        variant="outlined"
        fullWidth
        name="institution"
        value={formData.education.institution}
        onChange={handleChange}
      />
      <TextField
        label="Degree"
        variant="outlined"
        fullWidth
        name="degree"
        value={formData.education.degree}
        onChange={handleChange}
      />
      <TextField
        label="Field of study"
        variant="outlined"
        fullWidth
        name="field"
        value={formData.education.field}
        onChange={handleChange}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker label={'Starting Date'} views={["month", "year"]} />
          <DatePicker label={'Ending Date'} views={["month", "year"]} />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default SignupStep4;
