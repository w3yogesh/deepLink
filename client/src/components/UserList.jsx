// UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingForComponent from "./LoadingForComponent";


  // console.log('user not connected in userList page : ', props.userNotConnected);
function UserList({senderId, handleError,handleSuccess, usersNotConnected}) {
  const [userNotConnected, setUserNotConnected] = useState(usersNotConnected);

  const [users, setUsers] = useState([]);
  const [sentConnect, setSentConnect] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const senderId = props.senderId;
  function handleSendConnectRequest(senderId, recipientId) {
    const sendConnectRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/connect/${senderId}/${recipientId}`,
          { withCredentials: true }
        );
        const { status, message } = response.data;
        if (status) {
          console.log(message);
          handleSuccess(message)

          setSentConnect((prev) => [...prev, recipientId]);
        } else {
          console.log(message);
          handleError(message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call the sendConnectRequest function when the button is clicked
    sendConnectRequest();
  }

  useEffect(() => {
    setUserNotConnected(usersNotConnected);
    if(usersNotConnected.length > 0) setIsLoading(false);
  }, [usersNotConnected]);

  return (
    <div>
      {isLoading && <LoadingForComponent/>}
      {!isLoading && <div>
      <h4>All Users</h4>
      <ul className="user-cards">
        {userNotConnected.map((user) => (
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
                    <button disabled> Pending </button>
                  )}
                  {!sentConnect.includes(user._id) && (
                    <button
                      onClick={() =>
                        handleSendConnectRequest(senderId, user._id)
                      }
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>}
    </div>
  );
}

export default UserList;
