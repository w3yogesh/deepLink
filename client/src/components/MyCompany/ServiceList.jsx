import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Retrieve the API URL from environment variables
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Include cookies if needed
});

const ServiceList = ({ companyId }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get(`/service/${companyId}`);
        setServices(response.data.services);
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
    };

    fetchServices();
  }, [companyId]);

  return (
    <div className='all-service-list'>
      <h2>Our Service</h2>
      <div className="company-service-list">
      {services.map((service) => (
        <div className='service-list' key={service._id} >
          <h3>{service.serviceName}</h3>
          <p>Description: {service.description}</p>
          <p>Price: ${service.price}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ServiceList;
