import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";

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
    <div
      style={{ flex: 1, display: "flex", flexDirection: "column", padding: 16 }}
    >
      {chat ? (
        <>
          <Typography variant="h6">Chat with {chat.name}</Typography>
          <Paper
            style={{
              flex: 1,
              padding: 16,
              marginBottom: 16,
              overflowY: "auto",
            }}
          >
            {messages.map((message, index) => (
              <Typography key={index} paragraph>
                {message}
              </Typography>
            ))}
          </Paper>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </>
      ) : (
        <Typography>Select a friend or group to start chatting</Typography>
      )}
    </div>
  );
};

export default ChatWindow;
