import { DataArray } from "@mui/icons-material";
import { Avatar, Chip } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react"


import Link from "next/link";
import { DeleteChat } from "./delete-chat";

export interface SingleChatOverviewProps {
  conversation: string,
  email: string,
  username: string;
  avatar: string;
  lastMessageTime: number | null;
  unread: boolean;
  id: number;
  active: boolean;
}

export const SingleChatOverview = (props: SingleChatOverviewProps
  ) => {
  // converts to nicely readable time difference
  const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit",
    numeric: "always", 
    style: "long",
  });

  let time;
  if (props.lastMessageTime === null) {
    time = "no messages";
  } else {
    const diff = props.lastMessageTime - Date.now();
    time = rtf.format(Math.round(diff / (1000 * 60 * 60 * 24)), "days");
    if (diff / (1000 * 60 * 60 * 24) > -1) {
      rtf.format(Math.round(diff / (1000 * 60 * 60)), "hours");
    }
    if (diff / (1000 * 60 * 60) > -1) {
      time = rtf.format(Math.round(diff / (1000 * 60)), "minutes");
    }
    if (diff / (1000 * 60) > -1) {
      time = rtf.format(Math.round(diff / 1000), "seconds");
    }
  }

  const [exists, setExists] = useState(true);

  return (
    <div>
    {exists === true && <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        border: "1px solid #e6e6e6",
        paddingLeft: "10px",
      }}
    >
      <Link href={`/chat/chat?other=${props.email}`}>
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
      <DeleteChat conversation={props.conversation} setExists={setExists} />
    </Box>
    }
    </div>
  );
};
