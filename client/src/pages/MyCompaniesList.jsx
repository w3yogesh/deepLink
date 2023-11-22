import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
const MyCompanies = () => {
  const [myId, setMyId] = useState("");
  const [userCompanies, setUserCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyDetails, setCompanyDetails] = useState([]); // Store details of each company
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = response.data;
        if (status) {
          setMyId(user._id);
          setUserCompanies(user.company || []);
          setLoading(false);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error authenticating user:", error.message);
        setLoading(false);
      }
    };
    userAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const promises = userCompanies.map(async (companyId) => {
          const response = await axios.get(
            `http://localhost:4000/mycompanies/${companyId}`
          );
          return response.data; // Assuming the response contains the details of the company
        });

        const details = await Promise.all(promises);
        setCompanyDetails(details);
      } catch (error) {
        console.error("Error fetching company details:", error.message);
      }
    };

    if (userCompanies.length > 0) {
      fetchCompanyDetails();
    }
  }, [userCompanies]);
  console.log(companyDetails);
  return (
    <>
      <Navbar />
      <div className="my-companies grid-container">
        <div className="companies-main">
          <div className="companies-list">
            <h2>Companies</h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ul className="companies-cards">
                {companyDetails.map((company) => (
                  <Link to={`/company/${company._id}`}>
                    <div className="companies-card-list" key={company._id}>
                      <div className="companies-card">
                        <div className="companies-card-meta">
                          <div className="companies-card-img profile-photo img">
                            <img
                              src={
                                company.logo
                                  ? `http://localhost:4000/fetchCompanyImage/${company.logo}`
                                  : "/images/user-profile-photo.svg"
                              }
                            />
                          </div>
                          <div className="user-card-info">
                            <Link to={`/company/${company._id}`}>
                              <span className="companies-card-name">
                              <h4 key={company._id}>{company.companyName}</h4>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="companies-sidebar"></div>
      </div>
    </>
  );
};

export default MyCompanies;
