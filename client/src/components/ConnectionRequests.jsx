
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
      const response = await axios.get(`http://localhost:4000/api/accept-connection/${senderId}/${receiverId}`);
      const {status, message} = response.data;

      if (status) {
        console.log(message);
        setUsers(prev => prev.filter(user => user._id !== receiverId))
      }
      else{
        console.log(message);
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
      if (response.data.message === 'ignore Successfully') {
        console.log(response.data);
        // Handle the case when the connection is accepted
        // You can call a function like onAccept() here if needed
        setUsers(prev => prev.filter(user => user._id !== receiverId))
      }
      else  {
        console.log('not ignored');
      }
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
  }
  console.log(users)

  return (
    <div>
      <h2>Connection Requests</h2>
      <ul>
      {users.map((user) => (
          <li key={user._id}>
            User ID: {user._id}
            <br />
            Name: {user.firstName}
            <br/>
            <button onClick={()=>handleRequestIgnore(userId,user._id)}>ignore</button>
            <button onClick={()=>handleRequestAccept(userId,user._id)}>Accept</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConnectionRequest;
