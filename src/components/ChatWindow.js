import React, { useState } from "react";
import "./ChatWindow.css"; // Create this CSS file for custom styling

const ChatWindow = ({ chat, messages, onSendMessage, friends }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (newMessage.trim() !== "") {
        onSendMessage(newMessage);
        setNewMessage("");
      }
    }
  };

  const getGroupMemberNames = (groupId) => {
    const group = friends.find((f) => f.id === groupId);
    if (group && group.members) {
      return group.members
        .map((id) => {
          const friend = friends.find((f) => f.id === id);
          return friend ? friend.name : "Unknown";
        })
        .join(", ");
    }
    return "";
  };

  return (
    <div className="chat-window">
      {chat ? (
        <>
          <div className="chat-header">
            <div className="chat-title">{chat.name}</div>
            {chat.members && (
              <div className="chat-members">
                {chat.members
                  .map((id) => {
                    const friend = friends.find((f) => f.id === id);
                    return friend ? friend.name : "Unknown";
                  })
                  .join(", ")}
              </div>
            )}
          </div>
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "Alice" ? "sent" : "received"
                }`}
              >
                <div className="message-bubble">
                  <div className="message-text">{msg.text}</div>
                  <div className="message-sender">{msg.sender}</div>
                </div>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="message-input"
          />
        </>
      ) : (
        <div className="placeholder">
          Select a friend or group to start chatting
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
