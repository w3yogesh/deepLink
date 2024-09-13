import React, { useEffect, useState } from "react";
import axios from 'axios';
import LoadingForComponent from "./LoadingForComponent";
import { Link } from "react-router-dom";

// Retrieve the API URL from environment variables
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Create an Axios instance with the base 
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Include cookies if needed
});
function MyConnections({ senderId, handleError, handleSuccess, connectedUser }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteMyConnection = async (receiverId) => {
    try {
      const response = await api.delete(
        `/api/deleteMyConnection/${senderId}/${receiverId}`
      );
      const { status, message } = response.data;
      if (status) {
        console.log(message);
        setUsers((users) => users.filter((user) => user._id !== receiverId));
        handleSuccess(message);
      } else {
        console.log(message);
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMyConnections = async () => {
      try {
        const response = await api.get(
          `/api/myConnections/${senderId}`
        );
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    // Ensure fetchMyConnections is called when the component mounts
    fetchMyConnections();
  }, [senderId]); // Include senderId as a dependency for useEffect

  return (
    <div>
      {isLoading && <LoadingForComponent />}
      {!isLoading && (
        <div>
          <h4>My Connection</h4>
          <ul className="user-cards">
            {connectedUser.map((user) => (
              <li className="user-card-list" key={user._id}>
                <div className="user-card">
                  <div className="user-card-meta">
                    <div className="user-card-img profile-photo img">
                      <img
                        src={
                          user.profileImage
                            ? `/fetchProfileImage/${user.profileImage}`
                            : "/images/user-profile-photo.svg"
                        }
                        alt=""
                      />
                    </div>
                    <div className="user-card-info">
                      <Link to={`/userprofileview/${user._id}`}>
                        {" "}
                        <span className="user-card-name">
                          {user.firstName} {user.lastName}
                        </span>{" "}
                      </Link>
                      <span className="user-card-headline">
                        {user.headline}
                      </span>
                      <span className="user-card-connection"></span>
                    </div>
                    <div className="user-card-action">
                      <button
                        onClick={() => {
                          handleDeleteMyConnection(user._id);
                        }}
                      >
                        Drop
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyConnections;
