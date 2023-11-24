import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function ConnectionSent({senderId, handleError,handleSuccess}) {
    const [users, setUsers] = useState([]);
    const userId = senderId;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/sentConnections${userId}`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDropConnection = async (senderId, receiverId)=> {
    try {
      const response = await axios.post('http://localhost:4000/api/drop-connection',{senderId, receiverId});
      const {status, message} = response.data;
      if (status) {
        console.log(message);
        handleSuccess(message);
        setUsers(prev => prev.filter(user => user._id !== receiverId))
      }
      else  {
        console.log(message);
        handleError(message);

      }
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
      
  }

  return (
    <div>
      <h4>Sent Conection</h4>


      <ul className="user-cards">
        {users.map((user) => (
          <li className="user-card-list" key={user._id}>
            <div className="user-card">
              <div className="user-card-meta">
                <div className="user-card-img profile-photo img">
                  <img src={user.profileImage ? `http://localhost:4000/fetchProfileImage/${user.profileImage}` : "/images/user-profile-photo.svg"} alt="" />
                </div>
                <div className="user-card-info">
                <Link to={`/userprofileview/${user._id}`}>   <span className="user-card-name">
                    {user.firstName} {user.lastName}
                  </span> </Link>
                  <span className="user-card-headline">{user.headline}</span>
                  <span className="user-card-connection"></span>
                </div>
                <div className="user-card-action">
                <button onClick={()=>handleDropConnection(userId,user._id)}>Drop</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConnectionSent;
