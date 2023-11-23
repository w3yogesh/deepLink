import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
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
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="my-companies grid-container">
        <div className="companies-main">
          <div className="companies-list">
            <div className="company-header">
              <h2>My Companies</h2>
              <div className="create-company-button">
                <a href="/createcompany">
                  <button>Create Company</button>
                </a>
              </div>
            </div>
            <ul className="companies-cards">
              {companyDetails.map((company) => (
                <Link to={`/mycompany/${company._id}`}>
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
                          <Link to={`/mycompany/${company._id}`}>
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
          </div>
        </div>
        <div className="companies-sidebar"></div>
      </div>
      <style>
        {`
          ul.companies-cards {
            display: flex;
            justify-content: space-evenly;
            text-align: center;
            margin: 30px 0 0 0;
        }
        
        .companies-list {
            margin: 20px 0 0 0;
        }
        
        .companies-card-list {
            border: 1px solid #eee;
            padding: 10px;
            width: 18vw;
            background: #fff;
            border-radius: 10px;
        }
        .company-header {
          display: flex;
          justify-content: space-between;
      }
          `}
      </style>
    </>
  );
};

export default MyCompanies;
