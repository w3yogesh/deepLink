// Chat.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import UserList from '../components/ChatComponent/UserList';
import MessageBox from '../components/ChatComponent/MessageBox';

import '../styles/chat.css';
import { ChatBox } from '../components/ChatComponent/ChatBox';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState(['']);
  const [selectedUser, setSelectedUser] = useState(null);
  const [myId, setMyId] = useState('6545fa65389a9cf8a2aa5757');
  const [requestId, setRequestId] = useState('');
  const inputRef = useRef(null);

 

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setRequestId(user._id);
    // console.log(selectedUser._id);
    try {
      const response = await axios.get(`http://localhost:4000/chats/${myId}/${user._id}`);
      setMessages(response.data);
      inputRef.current.focus();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="chat-box">
        <div className="chat-header">
          <h5 className="header-message">Chat</h5>
        </div>
        <div className="chat-body">
          <UserList users={users} setUsers={setUsers} selectedUser={selectedUser} setRequestId={setRequestId} handleUserClick={handleUserClick} />
          <div className='message-body'>
          <MessageBox messages={messages} myId={myId} />
          <ChatBox setSelectedUser={setSelectedUser} inputRef={inputRef} myId={myId} requestId={requestId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
