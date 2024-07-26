import React, { useState } from "react";

const ChatWindow = ({ friend, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-window">
      {friend ? (
        <>
          <h3>Chat with {friend.name}</h3>
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
            placeholder="Type a message"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
        </>
      ) : (
        <h3>Select a friend to start chatting</h3>
      )}
    </div>
  );
};

export default ChatWindow;
