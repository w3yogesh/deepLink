import React, { useState } from 'react';
import axios from 'axios';

// Retrieve the API URL from environment variables
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Include cookies if needed
});

const ServiceForm = ({companyId}) => {
    // const companyId = props;
  const [formData, setFormData] = useState({
    serviceName: '',
    description: '',
    price: 0,
    createdBy:companyId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await api.post('/createService', formData);

      console.log('response:', response.data.message);

      setFormData({
        serviceName: '',
        description: '',
        price: 0,
        createdBy:'',
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <label>
        Service Name:
        <input
          type="text"
          name="serviceName"
          value={formData.serviceName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ServiceForm;
