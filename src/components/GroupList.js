import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

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
    <div style={{ width: 250, borderRight: "1px solid #ddd", padding: 16 }}>
      <Typography variant="h6">Groups</Typography>
      <Divider />
      <List>
        {groups.map((group) => (
          <ListItem button key={group.id} onClick={() => onSelectGroup(group)}>
            <ListItemText primary={group.name} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" style={{ marginTop: 16 }}>
        Create New Group
      </Typography>
      <TextField
        fullWidth
        label="Group name"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        style={{ marginTop: 8 }}
      />
      <Typography variant="subtitle1" style={{ marginTop: 16 }}>
        Select Friends:
      </Typography>
      {friends.map((friend) => (
        <FormControlLabel
          key={friend.id}
          control={
            <Checkbox
              checked={selectedFriends.includes(friend.id)}
              onChange={() => handleFriendSelection(friend.id)}
            />
          }
          label={friend.name}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 16 }}
        onClick={handleAddGroup}
      >
        Add Group
      </Button>
    </div>
  );
};

export default GroupList;
