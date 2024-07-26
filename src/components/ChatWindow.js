import React, { useState } from "react";
import "./ChatWindow.css"; // Ensure this CSS file is created with appropriate styles

const ChatWindow = ({ chat, messages, onSendMessage, friends }) => {
  const [message, setMessage] = useState("");

  if (!chat) {
    return (
      <div className="chat-window">
        Select a friend or group to start chatting
      </div>
    );
  }

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">{chat.name}</div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "You" ? "sent" : "received"}`}
          >
            <div className="message-sender">{msg.sender}</div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
