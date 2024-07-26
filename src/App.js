import React, { useState } from "react";
import FriendList from "./components/FriendList";
import GroupList from "./components/GroupList";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

const App = () => {
  const [friends] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  const [groups, setGroups] = useState([
    { id: 1, name: "Group A", members: [1, 2] },
    { id: 2, name: "Group B", members: [2, 3] },
  ]);

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState({});

  const handleSelectChat = (chat) => {
    setCurrentChat(chat);
  };

  const handleSendMessage = (message) => {
    if (currentChat) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentChat.id]: [...(prevMessages[currentChat.id] || []), message],
      }));
    }
  };

  const handleAddGroup = (name, members) => {
    const newGroup = {
      id: groups.length + 1,
      name: name,
      members: members,
    };
    setGroups([...groups, newGroup]);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <FriendList friends={friends} onSelectFriend={handleSelectChat} />
        <GroupList
          groups={groups}
          friends={friends}
          onSelectGroup={handleSelectChat}
          onAddGroup={handleAddGroup}
        />
      </div>
      <ChatWindow
        chat={currentChat}
        messages={currentChat ? messages[currentChat.id] || [] : []}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;
