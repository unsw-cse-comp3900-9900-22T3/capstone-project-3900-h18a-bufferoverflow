import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { Typography } from "@mui/material";
let socket;

const Chat: NextPage = () => {

  return (
    <Template title="Chat">
      <Typography>Hello</Typography>
    </Template>
  );
};

export default Chat;
