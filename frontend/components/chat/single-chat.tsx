import { Avatar } from "@mui/material"
import { Box, Stack } from "@mui/system"

import Link from "next/link";
import { DeleteChat } from "./delete-chat";

export interface SingleChatOverviewProps {
  href: string;
  delHref: string;
  username: string;
  avatar: string;
  lastMessageTime: string;
}

export const SingleChatOverview = (props: {
  href: string;
  delHref: string;
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
      <Link href={props.href}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar src={props.avatar} />
          <h4>{props.username}</h4>
          <p>{props.lastMessageTime}</p>
        </Stack>
      </Link>
      <DeleteChat delHref={props.delHref} />   
    </Box>
  );
};