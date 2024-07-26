import React, { useState } from "react";
import "./GroupList.css"; // Create this CSS file for custom styling

const GroupList = ({ groups, friends, onSelectGroup, onAddGroup }) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleAddGroup = () => {
    if (newGroupName.trim() !== "" && selectedFriends.length > 0) {
      onAddGroup(newGroupName, selectedFriends);
      setNewGroupName("");
      setSelectedFriends([]);
      handleCloseDialog();
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
      <div className="header">Groups</div>
      <div className="list">
        {groups.map((group) => (
          <div
            className="list-item"
            key={group.id}
            onClick={() => onSelectGroup(group)}
          >
            <div className="avatar">{group.name[0]}</div>
            <div className="list-item-text">
              <div className="group-name">{group.name}</div>
              <div className="group-members">
                Members:{" "}
                {group.members
                  .map((id) => {
                    const friend = friends.find((f) => f.id === id);
                    return friend ? friend.name : "Unknown";
                  })
                  .join(", ")}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="add-group-button" onClick={handleOpenDialog}>
        Create New Group
      </button>
      {openDialog && (
        <div className="dialog">
          <div className="dialog-content">
            <div className="dialog-header">Create New Group</div>
            <input
              type="text"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="input-field"
            />
            <div className="friend-selection">
              <div className="friend-selection-header">Select Friends:</div>
              {friends.map((friend) => (
                <label key={friend.id} className="friend-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedFriends.includes(friend.id)}
                    onChange={() => handleFriendSelection(friend.id)}
                  />
                  {friend.name}
                </label>
              ))}
            </div>
            <div className="dialog-actions">
              <button onClick={handleCloseDialog} className="cancel-button">
                Cancel
              </button>
              <button onClick={handleAddGroup} className="confirm-button">
                Add Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupList;
