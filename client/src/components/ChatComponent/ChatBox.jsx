import React,{ useEffect, useState} from "react";
import axios from "axios";
import io from "socket.io-client";


export const ChatBox = ({ inputRef, myId,requestId, setMessages,setNoti,noti,setNotiId}) => {
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState('');
 

  useEffect(() => {
    const socketIO = io("http://localhost:4000", {
        query: { userId: myId },
      });
      setSocket(socketIO);

      socketIO.on("connect", () => {
        console.log("Connected to server");
      });
  
      socketIO.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      socketIO.on("private-message", ({ from, message }) => {
        if(requestId === from){
          setMessages(prevMessages => [...prevMessages, { recipient : from, content: message, timestamp: Date.now() }]);
          // console.log(`Received message from ${from}: ${message}`);
        }else{
          console.log("notification");
          setNoti((prevNoti) => prevNoti + 1)
          setNotiId(from)
        }
       
      });
  }, [myId, requestId, setMessages, setNoti, setNotiId]);


    const handleMessageInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    const handleSendMessage = async () => {
    console.log('Message sent:', messageInput);
    setMessages(prevMessages => [...prevMessages, { sender: myId,recipient : requestId,  content: messageInput, timestamp: Date.now() }]);
    
    socket.emit("private-message", { to: requestId, message: messageInput,  myId });

    

    inputRef.current.focus();

    try {
        const response = await axios.post('http://localhost:4000/messaging', {
        myId,
        requestId,
        messageInput,
        });
        setMessageInput('');
        // console.log(response.data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
    };

  return (
    <div className="message-input">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type Something"
        value={messageInput}
        onChange={handleMessageInputChange}
      />
      <button className="send-button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};
