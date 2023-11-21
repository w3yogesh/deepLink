import React, { useState } from 'react';
import axios from 'axios';

const JobPostingForm = ({companyId}) => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    postedBy:companyId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/jobposting', jobData);

      console.log(response.data);

    } catch (error) {
      console.error('Error submitting job form:', error.message);
    }
  };

  return (
    <div className='job-post-form'>
      <h2>Create Job Opening</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={jobData.title} onChange={handleInputChange} />
        </label>
        <label>
          Company:
          <input type="text" name="company" value={jobData.company} onChange={handleInputChange} />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={jobData.location} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={jobData.description} onChange={handleInputChange} />
        </label>
        <label>
          Requirements:
          <textarea name="requirements" value={jobData.requirements} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobPostingForm;
