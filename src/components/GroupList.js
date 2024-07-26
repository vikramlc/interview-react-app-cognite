import React, { useState } from "react";

const GroupList = ({ groups, friends, onSelectGroup, onAddGroup }) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);

  const handleAddGroup = () => {
    if (newGroupName.trim() !== "" && selectedFriends.length > 0) {
      onAddGroup(newGroupName, selectedFriends);
      setNewGroupName("");
      setSelectedFriends([]);
    }
  };

  const handleFriendSelection = (friendId) => {
    setSelectedFriends((prevSelected) =>
      prevSelected.includes(friendId)
        ? prevSelected.filter((id) => id !== friendId)
        : [...prevSelected, friendId]
    );
  };

  return (
    <div className="group-list">
      <h3>Groups</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.id} onClick={() => onSelectGroup(group)}>
            {group.name}
          </li>
        ))}
      </ul>
      <h4>Create New Group</h4>
      <input
        type="text"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        placeholder="Group name"
      />
      <div className="friend-selection">
        <h5>Select Friends:</h5>
        {friends.map((friend) => (
          <div key={friend.id}>
            <input
              type="checkbox"
              checked={selectedFriends.includes(friend.id)}
              onChange={() => handleFriendSelection(friend.id)}
            />
            {friend.name}
          </div>
        ))}
      </div>
      <button onClick={handleAddGroup}>Add Group</button>
    </div>
  );
};

export default GroupList;
