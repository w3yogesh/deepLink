import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const MyCompanies = () => {
  const [myId, setMyId] = useState('');
  const [userCompanies, setUserCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyDetails, setCompanyDetails] = useState([]); // Store details of each company
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = async () => {
      try {
        const response = await axios.post('http://localhost:4000', {}, { withCredentials: true });
        const { status, user } = response.data;
        if (status) {
          setMyId(user._id);
          setUserCompanies(user.company || []);
          setLoading(false);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error authenticating user:', error.message);
        setLoading(false);
      }
    };
    userAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const promises = userCompanies.map(async (companyId) => {
          const response = await axios.get(`http://localhost:4000/mycompanies/${companyId}`);
          return response.data; // Assuming the response contains the details of the company
        });

        const details = await Promise.all(promises);
        setCompanyDetails(details);
      } catch (error) {
        console.error('Error fetching company details:', error.message);
      }
    };

    if (userCompanies.length > 0) {
      fetchCompanyDetails();
    }
  }, [userCompanies]);

  return (
    <div>
      <h2>List of Companies</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {companyDetails.map((company) => (
          <Link to={`/company/${company._id}`}><li key={company._id}>{company.companyName}</li></Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCompanies;
