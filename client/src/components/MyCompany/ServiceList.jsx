import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceList = ({ companyId }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/service/${companyId}`);
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
