import { Template } from "../../components/generic/Template";
import { useStore } from "../../store/store";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";

// TODO: The chat must display images with minimal latency
// Messages should be marked as read when they are…read.
// don't show to logged out users

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
    return (
      <Tooltip title="You are following this user">
        <CheckIcon />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Follow this user">
        <StarIcon />
      </Tooltip>
    );
  }
};

const ChatDiv = styled.div`
  display: grid;
  grid-template-rows: 86vh 1fr;
  justify-content: center;
  align-content: center | end;
  width: 100%;
  > div {
    // wanted this to be % based but couldn't get working
    min-width: 800px;
    overflow: scroll;
  }
`;

const Chat: NextPage = () => {
  const url = `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}`;
  const end = useRef(null);

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

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  let left;

  return (
    <Template title="Chat">
      <ChatDiv>
        <div>
          {messages.map((message) => (
            <Box
              sx={{
                display: "grid",
                justifyItems: message.author == author ? "end" : "start",
                padding: 0.5,
              }}
              key={message.timestamp}
            >
              <Box
                sx={{
                  backgroundColor: "#e6e6e6",
                  // borderStyle: "solid",
                  borderRadius: 1,
                  width: 0.5,
                }}
              >
                <Stack direction="row">
                  {!(message.author == author) && (
                    <Tooltip title={message.author}>
                      <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
                    </Tooltip>
                  )}
                  <Typography sx={{ padding: 1 }}>{message.text}</Typography>
                </Stack>
              </Box>
            </Box>
          ))}
          <div ref={end}></div>
        </div>
        <Stack
          direction="row"
          sx={{
            // position: "fixed",
            bottom: 0,
            padding: 2,
            width: 1,
            justifyContent: "center",
            backgroundColor: "white",
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
      </ChatDiv>
    </Template>
  );
};

export default Chat;
