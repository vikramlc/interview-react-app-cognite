import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

const FriendList = ({ friends, onSelectFriend }) => {
  return (
    <div style={{ width: 250, borderRight: "1px solid #ddd", padding: 16 }}>
      <Typography variant="h6">Friends</Typography>
      <Divider />
      <List>
        {friends.map((friend) => (
          <ListItem
            button
            key={friend.id}
            onClick={() => onSelectFriend(friend)}
          >
            <ListItemText primary={friend.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FriendList;
