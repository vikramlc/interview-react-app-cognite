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
  Avatar,
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
    <div
      style={{
        width: 300,
        borderRight: "1px solid #ddd",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" style={{ padding: 16 }}>
        Groups
      </Typography>
      <Divider />
      <List>
        {groups.map((group) => (
          <ListItem
            button
            key={group.id}
            onClick={() => onSelectGroup(group)}
            style={{ padding: 16 }}
          >
            <Avatar style={{ marginRight: 16 }}>{group.name[0]}</Avatar>
            <ListItemText primary={group.name} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" style={{ padding: 16 }}>
        Create New Group
      </Typography>
      <TextField
        fullWidth
        label="Group Name"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Typography variant="subtitle1" style={{ marginBottom: 8 }}>
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
        fullWidth
        onClick={handleAddGroup}
        style={{ marginTop: 16 }}
      >
        Add Group
      </Button>
    </div>
  );
};

export default GroupList;
