// UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from '@mui/material/Button';


function UserList(props) {
    const [users, setUsers] = useState([]);

    const [sentConnect, setSentConnect] = useState([])

    const senderId = props.senderId;
    function handleSendConnectRequest(senderId,recipientId) {       
        const sendConnectRequest = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/api/connect/${senderId}/${recipientId}`);
            const {status, message} = response.data;
            if (status) {
              console.log(message);
              setSentConnect(prev => [...prev, recipientId])
            }
            else{
              console.log(message);
            }
          } catch (error) {
            console.error('Error:', error);
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
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            User ID: {user._id}
            <br />
            Name: {user.firstName}
            <br/>
            Email: {user.email}
            <br/>
            {sentConnect.includes(user._id) && <Button variant="contained" disabled> Pending </Button>}
            {!sentConnect.includes(user._id) && <Button variant="contained" onClick={()=>handleSendConnectRequest(senderId,user._id)}>Connect</Button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
