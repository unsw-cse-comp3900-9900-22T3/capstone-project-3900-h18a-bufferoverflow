import { Avatar , IconButton } from "@mui/material"
import { Stack } from "@mui/system"
import DeleteForever from "@mui/icons-material/DeleteOutline"

export interface SingleChatOverviewProps {
  href: string;
  username: string;
  avatar: string;
  lastMessageTime: string;
}

export const SingleChatOverview = (props: { 
        href: string;
        username: string;
        avatar: string;
        lastMessageTime: string; 
}) => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar src={props.avatar}/>
      <text>{props.username}</text>
      <text>{props.lastMessageTime}</text>
      <IconButton
        size="large"
        aria-label="go to chat with this user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        href={props.href}
        sx={{}}
      >
        <DeleteForever/>
      </IconButton>
    </Stack>
  );
};