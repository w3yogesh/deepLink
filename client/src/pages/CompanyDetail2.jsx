import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Services2 from './Services2';
import JobOpenings2 from './JobOpenings2';
import { Link } from 'react-router-dom';

export default function CompanyDetail2() {
  
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    // Fetch the details of the specific company from the backend
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/company/${companyId}`);
        setCompany(response.data.company);
      
        
      } catch (error) {
        console.error('Error fetching company details:', error.message);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={`http://localhost:4000/fetchImage/${company.image}`} alt="trial" />
      <h2>{company.companyName}</h2>
      
      <p>Field: {company.field}</p>
      <p>Headquarter: {company.headquarter}</p>
      
      <div className="services">

        <Services2 companyId={companyId}/>
      </div>

      <div className="products">

      </div>

      <div className="jobs">

      <JobOpenings2 companyId={companyId}/>

      </div>

      
      {/* Add more details as needed */}
    </div>
  );
}
