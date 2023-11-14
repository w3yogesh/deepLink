import axios from 'axios';
import React, { useState, useEffect } from 'react';

const UserList = ({ users,setUsers,selectedUser,setSelectedUser, setRequestId,handleUserClick }) => {

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/users');
            setUsers(response.data);
            // setSelectedUser(users[0]); // Set the first user as selected by default
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
        fetchUsers();
      }, [users]); // Depend on 'users' to set the selected user after fetching
    
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
