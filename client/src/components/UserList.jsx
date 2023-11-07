// UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";



function UserList(props) {
    const [users, setUsers] = useState([]);
    const senderId = props.senderId;
    function handleSendConnectRequest(senderId,recipientId) {
      console.log(senderId);
       
        // Use an async function to perform the POST request
        const sendConnectRequest = async () => {
            
          try {
            const response = await axios.post('http://localhost:4000/connect', { senderId, recipientId });
            //console.log(response.data); // Log the response data
            if (response.data.message === 'Connection accepted') {
              // Handle the case when the connection is accepted
              // You can call a function like onAccept() here if needed
            }
          } catch (error) {
            // Handle any errors
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
            <button onClick={()=>handleSendConnectRequest(senderId,user._id)}>Connect</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
