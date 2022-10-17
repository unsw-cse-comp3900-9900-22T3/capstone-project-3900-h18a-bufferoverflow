import { Avatar , IconButton } from "@mui/material"
import { Box, Stack } from "@mui/system"
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        border: "1px solid #e6e6e6",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Avatar src={props.avatar} />
        <text>{props.username}</text>
        <text>{props.lastMessageTime}</text>
      </Stack>
      <IconButton
        size="large"
        aria-label="go to chat with this user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        href={props.href}
        sx={{}}
      >
        <DeleteForever />
      </IconButton>
    </Box>
  );
};