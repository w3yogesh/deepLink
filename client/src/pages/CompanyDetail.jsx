import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CompanyDetail() {
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
      <h2>{company.companyName}</h2>
      <p>Field: {company.field}</p>
      <p>Headquarter: {company.headquarter}</p>
      
      
      {/* Add more details as needed */}
    </div>
  );
}
