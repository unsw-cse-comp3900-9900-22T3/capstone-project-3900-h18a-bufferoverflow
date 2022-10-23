import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { Typography } from "@mui/material";
let socket;

const Chat: NextPage = () => {

  useEffect(() => {
    fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat`).finally(() => {
      const socket = io()

      socket.on('connect', () => {
        console.log('connect')
        socket.emit('hello')
      })

      socket.on('hello', data => {
        console.log('hello', data)
      })
    })
  }, [])


  return (
    <Template title="Chat">
      <Typography>Hello</Typography>
    </Template>
  );
};

export default Chat;
