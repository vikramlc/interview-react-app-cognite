import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";

const FriendList = ({ friends, onSelectFriend }) => {
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
        Friends
      </Typography>
      <Divider />
      <List>
        {friends.map((friend) => (
          <ListItem
            button
            key={friend.id}
            onClick={() => onSelectFriend(friend)}
            style={{ padding: 16 }}
          >
            <Avatar style={{ marginRight: 16 }}>{friend.name[0]}</Avatar>
            <ListItemText primary={friend.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FriendList;
