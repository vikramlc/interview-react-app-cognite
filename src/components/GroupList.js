import React, { useState } from "react";
import "./GroupList.css"; // Ensure this CSS file is created with appropriate styles

const GroupList = ({
  groups,
  friends,
  onSelectGroup,
  onSelectFriend,
  onAddGroup,
  selectedFriend,
}) => {
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

  const handleFriendSelection = (friend) => {
    onSelectFriend(friend);
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
                    onChange={() => {
                      setSelectedFriends((prev) =>
                        prev.includes(friend.id)
                          ? prev.filter((id) => id !== friend.id)
                          : [...prev, friend.id]
                      );
                    }}
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

      <div className="friends-chat">
        <div className="header">Friends</div>
        {friends.map((friend) => (
          <div
            className="list-item"
            key={friend.id}
            onClick={() => handleFriendSelection(friend)}
          >
            <div className="avatar">{friend.name[0]}</div>
            <div className="list-item-text">
              <div className="friend-name">{friend.name}</div>
              <div className="last-message">
                {friend.id === (selectedFriend && selectedFriend.id)
                  ? "You are chatting with this friend"
                  : "Click to start chatting"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
