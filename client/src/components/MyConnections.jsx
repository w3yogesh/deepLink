import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingForComponent from "./LoadingForComponent";

function MyConnections(props) {
  const [users, setUsers] = useState(props.connectedUser);
  const [isLoading, setIsLoading] = useState(true);
  const userId = props.senderId;

  const handleDeleteMyConnection = async (senderId, receiverId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/deleteMyConnection/${senderId}/${receiverId}`
      );
      const { status, message } = response.data;
      if (status) {
        console.log(message);
        setUsers((users) => users.filter((user) => user._id !== receiverId));
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchMyConnections = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/myConnections${userId}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    setUsers(props.connectedUser);
    if(props.connectedUser.length > 0)  setIsLoading(false);
  }, [props.connectedUser]);

  return (
    <div>
      {isLoading && <LoadingForComponent />}
      {!isLoading && (
        <div>
          <h4>My Conection</h4>
          <ul className="user-cards">
            {users.map((user) => (
              <li className="user-card-list" key={user._id}>
                <div className="user-card">
                  <div className="user-card-meta">
                    <div className="user-card-img profile-photo img">
                      <img
                        src={
                          user.profileImage
                            ? `http://localhost:4000/fetchProfileImage/${user.profileImage}`
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
                          handleDeleteMyConnection(userId, user._id);
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
