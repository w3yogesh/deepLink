import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = ({ users, setUsers, selectedUser, setSelectedUser, setRequestId, handleUserClick }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = async () => {
      try {
        const response = await axios.post('http://localhost:4000', {}, { withCredentials: true });
        const { status, user } = response.data;
        if (status) {
          setCurrentUser(user._id);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error authenticating user:', error.message);
      }
    };
    userAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log(currentUser);
        const response = await axios.get(`http://localhost:4000/myConnections${currentUser}`);
        setUsers(response.data);
        // setSelectedUser(users[0]); // Set the first user as selected by default
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser, setUsers]); // Include currentUser in the dependency array

  return (
    <div className="chat-users">
      <ul className="userList">
        {users.map((user) => (
          <li
            key={user._id}
            className={
              selectedUser && selectedUser._id === user._id
                ? "user selected"
                : "user"
            }
            onClick={() => {handleUserClick(user); setRequestId(user._id);}}
          >
            <img
              className="user-image"
              alt={user.firstName}
              src="/images/user-profile-photo.svg"
            />
            <span>{user.firstName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
