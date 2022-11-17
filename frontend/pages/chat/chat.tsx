import { Template } from "../../components/generic/Template";
import { useStore } from "../../store/store";
import { uploadFile } from "../../utils/utils";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, createRef, useState } from "react";
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
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { GET_FOLLOW, FOLLOW, UNFOLLOW } from "../profile/visitor-profile";
import { Message, MessageGraphqlProps, User } from "../../@types/pages.types";

// todo
// Messages should be marked as read when they are…read.
// don't show to logged out users
// stop socket breaking on hot reload

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const GET_CONVERSATION_MESSAGES_QUERY = gql`
  query getConversationMessagesQuery(
    $conversation: String!
    $us_email: String!
  ) {
    getMessages(conversation: $conversation, us_email: $us_email) {
      messages {
        id
        timestamp
        text
        author {
          id
        }
        conversation
      }
      us {
        id
        displayImg
        username
      }
      them {
        id
        displayImg
        username
      }
    }
  }
`;

const UPDATE_CONVERSATION_MUTATION = gql`
  mutation ($conversation: String!, $lastReadFirst: ID, $lastReadSecond: ID) {
    updateConversation(
      conversation: $conversation
      lastReadFirst: $lastReadFirst
      lastReadSecond: $lastReadSecond
    ) {
      success
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

  const end = createRef<HTMLDivElement>();

  const { auth } = useStore();
  const router = useRouter();
  const author = auth?.email;
  const other = router.query.other;
  const [joined, setJoined] = useState<boolean>(false);

  function updateJoined(joined: boolean) {
    setJoined(joined || true);
  }

  const [us, setUs] = useState<User>();
  const [them, setThem] = useState<User>();

  // ids start from 1.
  const [seen, setSeen] = useState("-1");
  const [updateConversation, _] = useMutation(UPDATE_CONVERSATION_MUTATION);

  const [conversation, setConversation] = useState("");
  const [position, setPosition] = useState<boolean>(false);

  const [following, setFollowing] = useState<boolean>(false);
  const [getFollowing, getFollowingResponse] = useLazyQuery(GET_FOLLOW);
  const [unfollow, _1] = useMutation(UNFOLLOW);
  const [follow, _2] = useMutation(FOLLOW);

  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    // since useEffect runs multiple times, but we only want to connect once
    if (!rendered && !joined) {
      socket = io(url);
      socket.on("connect", () => {
        console.log(socket.id);
      });

      // not the best on slower connections, since your own message
      // will disappear whilst waiting for the server to reply
      // makes the logic easier though
      socket.on("to_client", (message: Message) => {
        setMessages((oldMessages) => [...oldMessages, message]);
        setSeen(message.id);
      });

      setRendered(true);
    }
  }, [joined, rendered, url]);

  useEffect(() => {
    if (seen != "-1") {
      if (position) {
        updateConversation({
          variables: { conversation: conversation, lastReadFirst: seen },
        });
      } else {
        updateConversation({
          variables: { conversation: conversation, lastReadSecond: seen },
        });
      }
    }
  }, [conversation, position, seen, updateConversation]);

  const [getConversationMessages, { loading, error, data }] =
    useLazyQuery<MessageGraphqlProps>(GET_CONVERSATION_MESSAGES_QUERY);
  useEffect(() => {
    const messagesData = data?.getMessages.messages;
    if (messagesData) {
      setMessages(messagesData);
      if (messagesData.length > 0) {
        setSeen(messagesData[messagesData.length - 1].id);
      }
    }
    const usData = data?.getMessages.us;
    if (usData) {
      setUs({
        username: usData.username,
        displayImg: usData.displayImg,
        id: usData.id,
      });
    }
    const themData = data?.getMessages.them;
    if (themData) {
      setThem({
        username: themData.username,
        displayImg: themData.displayImg,
        id: themData.id,
      });
    }
  }, [data]);

  useEffect(() => {
    console.log(joined);
    if (!joined && author != undefined && other != undefined) {
      const local_conversation = [author, other].sort().join("-");
      setConversation(local_conversation);
      setPosition(author < other);

      socket.emit("join", { conversation: local_conversation });
      console.log(`joining [${local_conversation}] ${joined}`);
      console.log(local_conversation, author);
      getConversationMessages({
        variables: { conversation: local_conversation, us_email: author },
      });
      getFollowing({
        variables: { email1: auth?.email, email2: other },
      });
      updateJoined(joined);
    }
  }, [author, joined, other]);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [end, messages]);

  const sendMessage = async () => {
    console.log(text);
    if (text.trim() != "") {
      socket.emit("send_message", {
        timestamp: Date.now(),
        text: text.trim(),
        author: us?.id,
        conversation: conversation,
      });
      setText("");
    }
  };

  const imageRef = createRef<HTMLInputElement>();
  const [image, setImage] = useState("");

  useEffect(() => {
    socket.emit("send_message", {
      timestamp: Date.now(),
      text: image,
      author: us?.id,
      conversation: conversation,
    });
  }, [conversation, image, us?.id]);

  useEffect(() => {
    if (getFollowingResponse.data?.getFollowing.success) {
      setFollowing(getFollowingResponse.data?.getFollowing.success);
    }
  }, [getFollowingResponse]);

  return (
    <Template title="Chat">
      <ChatDiv>
        <div>
          {messages.map((message) => (
            <Box
              sx={{
                display: "grid",
                justifyItems: message.author.id == us?.id ? "end" : "start",
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
                  {!(message.author.id == us?.id) && (
                    <Link href={`/profile/visitor-profile?email=${other}`}>
                      <Tooltip title={them?.username}>
                        <Avatar src={them?.displayImg} alt={them?.username} />
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
          <Button
            onClick={async () => {
              if (following)
                await unfollow({
                  variables: { email1: auth?.email, email2: other },
                });
              else
                await follow({
                  variables: { email1: auth?.email, email2: other },
                });
              setFollowing(!following);
            }}
          >
            {followingIcon(following)}
          </Button>
          <TextField
            placeholder="Type something..."
            disabled={!rendered}
            sx={{ width: 0.9 }}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
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
                if (imageRef?.current?.files[0]) {
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
