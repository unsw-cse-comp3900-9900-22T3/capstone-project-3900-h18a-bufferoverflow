import { Template } from "../../components/generic/Template";
import { useStore } from '../../store/store'
import { NextPage } from "next";
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button, TextField, Typography } from "@mui/material";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { gql, useQuery } from '@apollo/client'

type Message = {
  text: string;
  author: string;
  timestamp: number;
};

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

interface MessageGraphqlProps {
  getMessages: {
    success: boolean;
    errors: string[] | null;
    messages: Message[] | null;
  }
}

const GET_CONVERSATION_MESSAGES_QUERY = gql`
  query getConversationMessagesQuery($conversation: String!){
    getMessages (conversation: $conversation) {
      messages {
        timestamp
        text
        author
        conversation
      }
    }
  }
`

const Chat: NextPage = () => {
  const url = `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}`;
  
  const { auth } = useStore();
  // apparently useEffect is run 2x by default, avoid this.
  const router = useRouter();
  const author = auth?.email;
  const conversation = [author, router.query.other].sort().join("-");
  
  const { data } = useQuery<MessageGraphqlProps>(GET_CONVERSATION_MESSAGES_QUERY, { variables: { conversation: conversation } });
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  const rendered = useRef(false);

  useEffect(() => {
    if (data?.getMessages.messages) {
      setMessages(data?.getMessages.messages)
    }
  }, [data])
  
  useEffect(() => {
    if (!rendered.current) {
      socket = io(url);
  
      socket.on("connect", () => {
        console.log(socket.id);
      });
  
      socket.on("to_client", (message) => {
        console.log(message);
        setMessages((oldMessages) => [...oldMessages, message]);
      });
    }

    rendered.current = true;
  }, []);

  const sendMessage = async () => {
    if (text != "") {
      socket.emit("send_message", {
        timestamp: Date.now(),
        text: text,
        author: author,
        conversation: conversation,
      });
      setText("");
    }
  };

  return (
    <Template title="Chat">
      <Typography>Messages:</Typography>
      <ol>
        {messages.map((message) => (
          <li key={message.timestamp}>
            <b>{message.author}</b>: {message.text}
          </li>
        ))}
      </ol>
      <TextField
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key == 'Enter') {
            sendMessage();
            e.preventDefault();
          }
        }}
        value={text}
      ></TextField>
      <Button onClick={sendMessage}>Send</Button>
    </Template>
  );
};

export default Chat;
