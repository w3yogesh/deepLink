import React from 'react';
import { useParams } from 'react-router-dom';
import ServiceForm from './ServiceForm';
import ServiceList from './ServiceList';

const Services = ({companyId}) => {

  return (
    <div>
      <h1>Service Page</h1>
        <ServiceList companyId={companyId}/>
      <ServiceForm companyId={companyId} />
    </div>
  );
};

export default Services;
