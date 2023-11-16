import React, { useState } from 'react';
import axios from 'axios';

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
      // Make an HTTP POST request to your backend endpoint
      console.log(formData);
      const response = await axios.post('http://localhost:4000/createService', formData);

      // Handle the response from the backend if needed
      console.log('Backend response:', response.data.message);

      // Reset the form after successful submission
      setFormData({
        serviceName: '',
        description: '',
        price: 0,
        createdBy:'',
      });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error submitting form:', error.message);
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
