import React, { useEffect, useState } from "react";
import axios from "axios";

function ConnectionSent(props) {
    const [users, setUsers] = useState([]);
    const userId = props.senderId;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/sentConnections${userId}`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDropConnection = async (senderId, receiverId)=> {
    try {
      const response = await axios.post('http://localhost:4000/drop-connection',{senderId, receiverId});
      //console.log(response.data); // Log the response data
      if (response.data.message === 'drop Successfully') {
        // Handle the case when the connection is accepted
        // You can call a function like onAccept() here if needed
        console.log('droped successfully');
        setUsers(prev => prev.filter(user => user._id !== receiverId))
      }
      else  {
        console.log('not dropped');
      }
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
      
  }

  return (
    <div>
      <h2>Sent Conection</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            User ID: {user._id}
            <br />
            Name: {user.firstName}
            <br/>
            <button onClick={()=>handleDropConnection(userId,user._id)}>Drop</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConnectionSent;
