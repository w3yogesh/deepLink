// Chat.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import UserList from "../components/ChatComponent/UserList";
import MessageBox from "../components/ChatComponent/MessageBox";
import { useNavigate } from "react-router-dom";
import "../styles/chat.css";
import { ChatBox } from "../components/ChatComponent/ChatBox";
import Navbar from "../components/Navbar"

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([""]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [myId, setMyId] = useState("");
  const [requestId, setRequestId] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [noti, setNoti] = useState(1);
  const [notiId, setNotiId] = useState('');

  useEffect(() => {
    const userAuth = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = response.data;
        if (status) {
          setMyId(user._id);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error authenticating user:", error.message);
      }
    };
    userAuth();
  }, [navigate]);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setRequestId(user._id);

    try {
      const response = await axios.get(
        `http://localhost:4000/chats/${myId}/${user._id}`
      );
      setMessages(response.data);
      inputRef.current.focus();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="main-container">
      <div className="chat-box">
        <div className="chat-header">
          <h5 className="header-message">Chat</h5>
        </div>
        <div className="chat-body">
          <UserList
            noti={noti}
            notiId={notiId}
            users={users}
            setUsers={setUsers}
            selectedUser={selectedUser}
            setRequestId={setRequestId}
            handleUserClick={handleUserClick}
          />
          <div className="message-body">
            {selectedUser && <MessageBox messages={messages} myId={myId} />}
            {selectedUser && (
              <ChatBox
                setNotiId={setNotiId}
                setSelectedUser={setSelectedUser}
                inputRef={inputRef}
                setMessages={setMessages}
                myId={myId}
                requestId={requestId}
                setNoti={setNoti}
                noti={noti}
              />
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Chat;
