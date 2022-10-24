import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button, TextField, Typography } from "@mui/material";
import { DefaultEventsMap } from "@socket.io/component-emitter";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Chat: NextPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<String>>([]);

  useEffect(() => {
    fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}`).finally(
      () => {
        socket = io(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}`);
        socket.on("connect", () => {
          console.log("connect");
          socket.emit("hello");
        });

        socket.on("to_client", (message) => {
          console.log(message);
          setMessages((oldMessages) => [
            ...oldMessages,
            message
          ]);
        });
      }
    );
  }, []);

  const sendMessage = async () => {
    socket.emit("send_message", message);
    // setMessages((currentMsg) => [
    //   ...currentMsg,
    //   { author: chosenUsername, message },
    // ]);
    setMessage("");
  };

  return (
    <Template title="Chat">
      <Typography>Messages:</Typography>
      <ol>
        {/* TODO: messages not actually unique should be an id / timestamp */}
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ol>
      <TextField
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></TextField>
      <Button onClick={sendMessage}>Test</Button>
    </Template>
  );
};

export default Chat;
