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
    <div>
      <h2>Our Service</h2>
      {services.map((service) => (
        <div key={service._id}>
          <h3>{service.serviceName}</h3>
          <p>Description: {service.description}</p>
          <p>Price: ${service.price}</p>
          {/* You can add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
