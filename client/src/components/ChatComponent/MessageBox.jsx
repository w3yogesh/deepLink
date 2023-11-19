import React from "react";

const MessageBox = ({ messages, myId }) => {
  return (
    <>
      <div className="message-area">
        <div className="message-header"></div>
        {messages && messages.length > 0 ? (
          <ul className="messageArea">
            {messages.map((message) => (
              <li
                key={message._id}
                className={
                  message.sender === myId ? "own-message" : "other-message"
                }
              >
                <div className="message">
                  <p>{message.content}</p>
                </div>
                <div className="timestamp">
                  <p className="message-timestamp">
                    {new Date(message.timestamp).toLocaleString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="messageArea">No chat available</p>
        )}
      </div>
    </>
  );
};

export default MessageBox;
