import { Template } from "../../components/generic/Template";
import { useStore } from "../../store/store";
import { uploadFile } from "../../utils/utils";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  Avatar,
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Message } from "../../utils/chat";

// todo
// Messages should be marked as read when they are…read.
// don't show to logged out users
// stop socket breaking on hot reload

type User = {
  username: string;
  displayImg: string;
  id: number;
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

interface UserGraphqlProps {
  getUser: {
    success: boolean | null;
    errors: string[] | null;
    user: User | null;
  };
}

const GET_USER_QUERY = gql`
  query getUserQuery($email: String!) {
    getUser(email: $email) {
      errors
      success
      user {
        id
        displayImg
        username
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
  const router = useRouter();
  const author = auth?.email;
  const other = router.query.other;
  
  const [us, setUs] = useState<User>({});
  const us_response = useQuery<UserGraphqlProps>(GET_USER_QUERY, {
    variables: { email: author || "" },
  });
  useEffect(() => {
    if (us_response.data?.getUser.user) {
      const user = us_response.data?.getUser.user;
      setUs({ username: user.username, displayImg: user.displayImg, id: user.id });
    }
  }, [us_response]);
  
  const [them, setThem] = useState<User>({});
  const them_response = useQuery<UserGraphqlProps>(GET_USER_QUERY, {
    variables: { email: other || "" },
  });
  
  useEffect(() => {
    if (them_response.data?.getUser.user) {
      const user = them_response.data?.getUser.user;
      setThem({ username: user.username, displayImg: user.displayImg, id: user.id });
    }
  }, [them_response]);
  
  const rendered = useRef(false);
  useEffect(() => {
    // apparently useEffect is run 2x by default, avoid this.
    if (!rendered.current) {
      socket = io(url);
      socket.on("connect", () => {
        console.log(socket.id);
      });
      
      // not the best on slower connections, since your own message 
      // will dissapear whilst waiting for the server to reply
      // makes the logic easier though
      socket.on("to_client", (message) => {
        console.log(message);
        setMessages((oldMessages) => [...oldMessages, message]);
      });
    }

    rendered.current = true;
  });

  const [conversation, setConversation] = useState("");
  useEffect(() => {
    if (author != undefined && other != undefined) {
      // weird but I couldn't get setConversation to have the var set for the socket.emit
      const local_conversation = [author, other].sort().join("-");
      setConversation(local_conversation);

      socket.emit("join", { conversation: local_conversation });
      console.log(`joining [${local_conversation}]`);
    }
  }, [author, other]);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  const { data } = useQuery<MessageGraphqlProps>(
    GET_CONVERSATION_MESSAGES_QUERY,
    { variables: { conversation: conversation } }
  );
  useEffect(() => {
    if (data?.getMessages.messages) {
      setMessages(data?.getMessages.messages);
    }
  }, [data]);
  
  
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const sendMessage = async () => {
    if (text != "") {
      socket.emit("send_message", {
        timestamp: Date.now(),
        text: text,
        author: us.id,
        conversation: conversation,
      });
      setText("");
    }
  };
  
  const imageRef = useRef(null);
  const [image, setImage] = useState("");
  
  useEffect(() => {
    socket.emit("send_message", {
      timestamp: Date.now(),
      text: image,
      author: author,
      conversation: conversation,
    });
  }, [image]);
  
  return (
    <Template title="Chat">
      <ChatDiv>
        <div>
          {messages.map((message) => (
            <Box
            sx={{
                display: "grid",
                justifyItems: message.author == us.id ? "end" : "start",
                padding: 0.5,
              }}
              key={message.timestamp}
            >
              <Box
                sx={{
                  backgroundColor: "#e6e6e6",
                  borderRadius: 1,
                  width: 0.5,
                }}
              >
                <Stack direction="row">
                  {!(message.author == us.id) && (
                    <Link href={`/profile/visitor-profile?email=${other}`}>
                      <Tooltip title={them.username}>
                        <Avatar src={them.displayImg} alt={them.username} />
                      </Tooltip>
                    </Link>
                  )}
                  {message.text.startsWith(
                    "https://comp3900storage.blob.core.windows.net"
                  ) ? (
                    <Box
                      sx={{ display: "grid", justifyItems: "center", width: 1 }}
                    >
                      <Box
                        component="img"
                        src={message.text}
                        sx={{ width: 1, maxWidth: 400 }}
                      />
                    </Box>
                  ) : (
                    <Typography sx={{ padding: 1 }}>{message.text}</Typography>
                  )}
                </Stack>
              </Box>
            </Box>
          ))}
          <div ref={end}></div>
        </div>
        <Stack
          direction="row"
          sx={{
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
          <Button component="label">
            <AddAPhotoIcon />
            <input
              type="file"
              ref={imageRef}
              hidden
              accept="image/png, image/jpeg"
              onChange={async () => {
                if (imageRef.current?.files[0]) {
                  setImage(await uploadFile(imageRef.current.files[0]));
                }
              }}
            />
          </Button>
          <Button onClick={sendMessage}>
            <SendIcon />
          </Button>
        </Stack>
      </ChatDiv>
    </Template>
  );
};

export default Chat;
