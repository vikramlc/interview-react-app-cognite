import React, { useState } from "react";
import GroupList from "./components/GroupList";
import ChatWindow from "./components/ChatWindow";

const App = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  const [groups, setGroups] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleSelectGroup = (group) => {
    setCurrentChat(group);
    setSelectedFriend(null); // Clear selected friend when switching to a group
  };

  const handleAddGroup = (groupName, memberIds) => {
    const newGroup = {
      id: groups.length + 1,
      name: groupName,
      members: memberIds,
    };
    setGroups([...groups, newGroup]);
    setCurrentChat(newGroup);
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setCurrentChat(null); // Clear current chat when switching to a friend
  };

  const handleSendMessage = (text) => {
    if (currentChat || selectedFriend) {
      const sender = friends.find((f) => f.id === 1); // Simulate sender ID
      const senderName = sender ? sender.name : "Unknown";
      const chatId = currentChat ? currentChat.id : selectedFriend.id;
      setMessages((prevMessages) => ({
        ...prevMessages,
        [chatId]: [
          ...(prevMessages[chatId] || []),
          { text, sender: senderName },
        ],
      }));
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <GroupList
        groups={groups}
        friends={friends}
        onSelectGroup={handleSelectGroup}
        onSelectFriend={handleSelectFriend}
        onAddGroup={handleAddGroup}
        selectedFriend={selectedFriend} // Pass selectedFriend prop
      />
      <ChatWindow
        chat={currentChat || selectedFriend}
        messages={
          currentChat || selectedFriend
            ? messages[currentChat ? currentChat.id : selectedFriend.id] || []
            : []
        }
        onSendMessage={handleSendMessage}
        friends={friends}
      />
    </div>
  );
};

export default App;
