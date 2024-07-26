import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const MessageBubble = styled(Paper)(({ theme, sender }) => ({
  padding: 10,
  margin: "5px 0",
  maxWidth: "75%",
  backgroundColor: sender ? "#dcf8c6" : "#ffffff",
  alignSelf: sender ? "flex-end" : "flex-start",
}));

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
          <Box
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              border: "1px solid #ddd",
              borderRadius: 8,
              backgroundColor: "#f8f9fa",
            }}
          >
            {messages.map((message, index) => (
              <MessageBubble key={index} sender={index % 2 === 0}>
                {message}
              </MessageBubble>
            ))}
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ marginTop: 16 }}
          />
        </>
      ) : (
        <Typography>Select a friend or group to start chatting</Typography>
      )}
    </div>
  );
};

export default ChatWindow;
