import React,{ useState} from "react";
import axios from "axios";

export const ChatBox = ({ inputRef, myId,requestId,setSelectedUser}) => {
    const [messageInput, setMessageInput] = useState('');

    const handleMessageInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    const handleSendMessage = async () => {
    console.log('Message sent:', messageInput);
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
