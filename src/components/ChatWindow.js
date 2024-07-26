import React, { useState } from "react";

const ChatWindow = ({ chat, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (newMessage.trim() !== "") {
        onSendMessage(newMessage);
        setNewMessage("");
      }
    }
  };

  return (
    <div className="chat-window">
      {chat ? (
        <>
          <h3>Chat with {chat.name}</h3>
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className="message">
                {message}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
          />
        </>
      ) : (
        <h3>Select a friend or group to start chatting</h3>
      )}
    </div>
  );
};

export default ChatWindow;
