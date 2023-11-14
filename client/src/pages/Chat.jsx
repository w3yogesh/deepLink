import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/chat.css";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([""]);
  const [myId, setMyId] = useState("6545fa65389a9cf8a2aa5757"); // My id who logined
  const [requestId, setRequestId] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        setUsers(response.data);
        setSelectedUser(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  // useEffect(() => {
  //
  // }, [chat]);

  useEffect(() => {
    if (selectedUser) {
      setRequestId(selectedUser._id);
    }
  }, [selectedUser]);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setRequestId(selectedUser._id);
    console.log(user._id);

    const response = await axios.get(
      `http://localhost:4000/chats/${myId}/${requestId}`
    );
    // const response = await axios.get(`http://localhost:4000/chats/6545fa65389a9cf8a2aa5757/65489f58d22a8ee31f6f0295`)
    setMessages(response.data);
    inputRef.current.focus();
  };

  const handleSendMessage = async () => {
    console.log("Message sent:", messageInput);
    inputRef.current.focus();
    const response = await axios.post("http://localhost:4000/messaging", {
      myId,
      requestId,
      messageInput,
    });
    setMessageInput("");
    // console.log(response.data);
  };

  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <div className="main-container">
      <div className="chat-box">
        <div className="chat-header">
          <h5 className="header-message">Chat</h5>
        </div>
        <div className="chat-body"> 
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
                  onClick={() => handleUserClick(user)}
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
               <div className="message-area">
            <div className="message-header">
            </div>
            {selectedUser && (
              <>
                {messages && messages.length > 0 ? (
                  <ul className="messageArea">
                    {messages.map((message) => (
                      <li
                        key={message._id}
                        className={
                          message.sender === myId
                            ? "own-message"
                            : "other-message"
                        }
                      >
                        <div className="message">
                          <p>{message.content}</p>
                        </div>
                        <div className="timestamp">
                          <p className="message-timestamp">
                            {message.timestamp}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="messageArea">
                    no chat Available
                  </p>
                )}
                <hr />
                <div className="message-text-area">
                  <div className="message-input">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Type Something"
                      value={messageInput}
                      onChange={handleMessageInputChange}
                    />
                  </div>
                  <div className="Message-send" align="right">
                    <button className="send-button" onClick={handleSendMessage}>
                      Send
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
