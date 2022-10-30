import { Template } from "../../components/generic/Template";
import { useStore } from "../../store/store";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button, Chip, Stack, TextField, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { gql, useQuery } from "@apollo/client";

// TODO: The chat must display images with minimal latency
// Chat should display the other user’s profile picture next to their messages
// Messages should be marked as read when they are…read.
// ui

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
  };
}

const GET_CONVERSATION_MESSAGES_QUERY = gql`
  query getConversationMessagesQuery($conversation: String!) {
    getMessages(conversation: $conversation) {
      messages {
        timestamp
        text
        author
        conversation
      }
    }
  }
`;

const followingIcon = (following: boolean) => {
  if (following) {
    return <CheckIcon />;
  } else {
    return <StarIcon />;
  }
};

const Chat: NextPage = () => {
  const url = `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}`;

  const { auth } = useStore();
  // apparently useEffect is run 2x by default, avoid this.
  const router = useRouter();
  const author = auth?.email;
  const conversation = [author, router.query.other].sort().join("-");

  const { data } = useQuery<MessageGraphqlProps>(
    GET_CONVERSATION_MESSAGES_QUERY,
    { variables: { conversation: conversation } }
  );
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  const rendered = useRef(false);

  useEffect(() => {
    if (data?.getMessages.messages) {
      setMessages(data?.getMessages.messages);
    }
  }, [data]);

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
      <Stack
        direction="row"
        sx={{
          position: "absolute",
          bottom: 20,
          width: 1,
          justifyContent: "center",
        }}
      >
        {/* todo: make this change based on following state */}
        <Button>{followingIcon(true)}</Button>
        <TextField
          placeholder="Type something..."
          disabled={!rendered.current}
          sx={{ width: 0.9 }}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              sendMessage();
              e.preventDefault();
            }
          }}
          value={text}
        ></TextField>
        <Button onClick={sendMessage}>
          <SendIcon />
        </Button>
      </Stack>
    </Template>
  );
};

export default Chat;
