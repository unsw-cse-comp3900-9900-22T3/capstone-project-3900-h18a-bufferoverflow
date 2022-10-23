
import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { useEffect } from 'react'
import io from 'socket.io-client'
import { Typography } from "@mui/material";
let socket

const Chat: NextPage = () => {
  useEffect(() => socketInitializer(), [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })
  }

  return (
    <Template title="Chat">
      <Typography>Hello</Typography>
    </Template>
  );
};

export default Chat
