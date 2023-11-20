// In your React component file (e.g., ChatComponent.js)
import React, { useEffect } from "react";
import io from "socket.io-client";

const ChatComponent = () => {
  useEffect(() => {
    const socket = io("http://localhost:4000", {
      query: { userId: "123456" }, // Replace with the user's actual Object ID
    });

    // Sending a private message to the opponent user
    socket.emit("private-message", { to: "098765", message: "Hello!" });

    socket.on("private-message", ({ from, message }) => {
      console.log(`Received message from ${from}: ${message}`);
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default ChatComponent;
