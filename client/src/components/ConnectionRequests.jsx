
import React, { useEffect, useState } from "react";
import axios from "axios";

function ConnectionRequest(props) {
    const [users, setUsers] = useState([]);
    const userId = props.senderId;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getConnections${userId}`);
        console.log(response.data)
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleRequestAccept = async (senderId,receiverId)=> {
    try {
      const response = await axios.post('http://localhost:4000/accept-connection', { senderId, receiverId });
      //console.log(response.data); // Log the response data
      if (response.data.message === 'Connection accepted') {
        // Handle the case when the connection is accepted
        // You can call a function like onAccept() here if needed
      }
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
  }

  const handleRequestIgnore = async (receiverId,senderId)=> {
    try {
      const response = await axios.post('http://localhost:4000/ignore-connection', { receiverId, senderId });
      //console.log(response.data); // Log the response data
      if (response.data.message === 'Connection accepted') {
        console.log(response.data);
        // Handle the case when the connection is accepted
        // You can call a function like onAccept() here if needed
      }
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
  }
  

  return (
    <div>
      <h2>Conection Requests</h2>
      <ul>
        {users.map((users) => (
          <li key={users._id}>
            User ID: {users._id}
            <br />
            Name: {users.firstName}
            <br/>
            <button onClick={()=>handleRequestIgnore(userId,users._id)}>ignore</button>
            <button onClick={()=>handleRequestAccept(userId,users._id)}>Accept</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConnectionRequest;
