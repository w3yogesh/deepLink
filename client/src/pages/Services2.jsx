import React from 'react';
import { useParams } from 'react-router-dom';
import ServiceList from '../components/MyCompany/ServiceList';

const Services2 = ({companyId}) => {

  return (
    <div>
      <h1>Service Page</h1>
        <ServiceList companyId={companyId}/>
    </div>
  );
};

export default Services2;
