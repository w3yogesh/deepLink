import React, { useEffect, useState } from "react";
import axios from "axios";

function ConnectionRequest(props) {
  const [users, setUsers] = useState([]);
  const userId = props.senderId;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/getConnections${userId}`
        );
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleRequestAccept = async (senderId, receiverId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/accept-connection/${senderId}/${receiverId}`
      );
      const { status, message } = response.data;

      if (status) {
        console.log(message);
        setUsers((prev) => prev.filter((user) => user._id !== receiverId));
      } else {
        console.log(message);
      }
    } catch (error) {
      // Handle any errors
      console.error("Error:", error);
    }
  };

  const handleRequestIgnore = async (receiverId, senderId) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/ignore-connection",
        { receiverId, senderId }
      );
      const {status, message} = response.data;
      if (status) {
        setUsers((prev) => prev.filter((user) => user._id !== receiverId));
        console.log(message);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h4>Connection Requests</h4>

      <ul className="user-cards">
        {users.map((user) => (
          <li className="user-card-list" key={user._id}>
            <div className="user-card">
              <div className="user-card-meta">
                <div className="user-card-img profile-photo img">
                  <img src={user.profileImage ? `http://localhost:4000/fetchProfileImage/${user.profileImage}` : "/images/user-profile-photo.svg"} alt="" />
                </div>
                <div className="user-card-info">
                  <span className="user-card-name">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="user-card-headline">{user.headline}</span>
                  <span className="user-card-connection"></span>
                </div>
                <div className="user-card-action">
                  <button className="ignore-btn" onClick={() => handleRequestIgnore(userId, user._id)}>
                    ignore
                  </button>
                  <button className="req-accept-btn" onClick={() => handleRequestAccept(userId, user._id)}>
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConnectionRequest;
