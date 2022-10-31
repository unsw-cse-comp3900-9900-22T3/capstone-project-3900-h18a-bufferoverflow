import { DataArray } from "@mui/icons-material";
import { Avatar, Chip } from "@mui/material"
import { Box, Stack } from "@mui/system"

import Link from "next/link";
import { DeleteChat } from "./delete-chat";

export interface SingleChatOverviewProps {
  href: string;
  delHref: string;
  username: string;
  avatar: string;
  lastMessageTime: number;
  unread: boolean;
}

export const SingleChatOverview = (props: {
  href: string;
  delHref: string;
  username: string;
  avatar: string;
  lastMessageTime: number;
  unread: boolean;
}) => {
  const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit", // other values: "lookup"
    numeric: "always", // other values: "auto"
    style: "long", // other values: "short" or "narrow"
  });

  const diff = (props.lastMessageTime - Date.now());
  // writing time code myself, I know gross
  let time = rtf.format(Math.round(diff / (1000 * 60 * 60 * 24)), 'days');
  if (diff / (1000 * 60 * 60 * 24) > -1) {
    rtf.format(Math.round(diff / (1000 * 60 * 60)), 'hours');
  }
  if (diff / (1000 * 60 * 60) > -1) {
    time = rtf.format(Math.round(diff / (1000 * 60)), 'minutes');
  }
  if (diff / (1000 * 60) > -1) {
    time = rtf.format(Math.round(diff / (1000)), 'seconds');
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        border: "1px solid #e6e6e6",
        paddingLeft: "10px",
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
          <p>{time}</p>
          {props.unread && <Chip label="unread" color="primary" />}
        </Stack>
      </Link>
      <DeleteChat delHref={props.delHref} />   
    </Box>
  );
};