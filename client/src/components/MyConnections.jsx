import React, { useEffect, useState } from "react";
import axios from "axios";

function MyConnections(props) {
    const [users, setUsers] = useState([]);
    const [removeBtn, setRemoveBtn] = useState('Remove')
    const userId = props.senderId;

    const handleDeleteMyConnection = async (senderId, receiverId)=>{
      try {
        const response = await axios.delete(`http://localhost:4000/deleteMyConnection/${senderId}/${receiverId}`);
        const {status, message} = response.data;
        if(status){
          console.log(message);
          setRemoveBtn('Removed');
        }else{
          console.log(message);
        }
        
      } catch (error) {
        
      }
    }
  useEffect(() => {
    const fetchMyConnections = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/myConnections${userId}`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchMyConnections();
  }, []);

  return (
    <div>
      <h2>My Conection</h2>
      <ul>
        {users.map((users) => (
          <li key={users._id}>
            User ID: {users._id}
            <br />
            Name: {users.firstName}
            <br/>
            <button onClick={()=>{handleDeleteMyConnection(userId,users._id)}}>{removeBtn}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyConnections;