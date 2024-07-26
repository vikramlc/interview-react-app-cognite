import React, { useState } from "react";
import FriendList from "./components/FriendList";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

const App = () => {
  const [friends] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  const [currentFriend, setCurrentFriend] = useState(null);
  const [messages, setMessages] = useState({});

  const handleSelectFriend = (friend) => {
    setCurrentFriend(friend);
  };

  const handleSendMessage = (message) => {
    if (currentFriend) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentFriend.id]: [
          ...(prevMessages[currentFriend.id] || []),
          message,
        ],
      }));
    }
  };

  return (
    <div className="App">
      <FriendList friends={friends} onSelectFriend={handleSelectFriend} />
      <ChatWindow
        friend={currentFriend}
        messages={currentFriend ? messages[currentFriend.id] || [] : []}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;
