// UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function UserList(props) {
  const [users, setUsers] = useState([]);

  const [sentConnect, setSentConnect] = useState([]);

  const senderId = props.senderId;
  function handleSendConnectRequest(senderId, recipientId) {
    const sendConnectRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/connect/${senderId}/${recipientId}`
        );
        const { status, message } = response.data;
        if (status) {
          console.log(message);
          setSentConnect((prev) => [...prev, recipientId]);
        } else {
          console.log(message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call the sendConnectRequest function when the button is clicked
    sendConnectRequest();
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h4>All Users</h4>
      <ul className="user-cards">
        {users.map((user) => (
          <li className="user-card-list" key={user._id}>
            <div className="user-card">
              <div className="user-card-meta">
                <div className="user-card-img profile-photo img">
                  <img
                    src={user.profileImage ? `http://localhost:4000/fetchProfileImage/${user.profileImage}` : "/images/user-profile-photo.svg"}
                  />
                </div>
                <div className="user-card-info">
                <Link to={`/userprofileview/${user._id}`}>  <span className="user-card-name">{user.firstName} {user.lastName}</span></Link>
                  <span className="user-card-headline">{user.headline}</span>
                  <span className="user-card-connection">Connections</span>
                </div>
                <div className="user-card-action">
                  {sentConnect.includes(user._id) && (
                    <Button disabled> Pending </Button>
                  )}
                  {!sentConnect.includes(user._id) && (
                    <Button
                      onClick={() =>
                        handleSendConnectRequest(senderId, user._id)
                      }
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
