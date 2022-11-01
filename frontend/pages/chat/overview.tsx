import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { Stack, Box } from "@mui/system";
import {
  SingleChatOverview,
  SingleChatOverviewProps,
} from "../../components/chat/single-chat";
import { Message } from "../../utils/chat";
import { gql, useLazyQuery } from "@apollo/client";
import { useStore } from "../../store/store";
import { Typography } from "@mui/material";

type Conversation = {
  id: number;
  conversation: string;
  lastReadFirst: Message;
  lastReadSecond: Message;
};
interface ConversationGraphqlProps {
  getConversations: {
    success: boolean;
    errors: string[] | null;
    conversations: Conversation[] | null;
  };
}

const GET_CONVERSATIONS_QUERY = gql`
  query getConversationsQuery($involving: String!) {
    getConversations(involving: $involving) {
      conversations {
        id
        conversation
        lastReadFirst {
          author {
            username
            displayImg
          }
          timestamp
        }
        lastReadSecond {
          author {
            username
            displayImg
          }
          timestamp
        }
      }
    }
  }
`;

const ChatOverview: NextPage = () => {
  const [conversations, setConversations] = useState<Array<Conversation>>([]);

  const { auth } = useStore();
  const [getConversations, { loading, error, data }] =
    useLazyQuery<ConversationGraphqlProps>(GET_CONVERSATIONS_QUERY);
  useEffect(() => {
    if (auth?.email != undefined) {
      getConversations({ variables: { involving: auth?.email } });
      setConversations(data?.getConversations.conversations);
    }
  }, [auth, data]);

  const [chats, setChats] = useState<Array<SingleChatOverviewProps>>([]);

  useEffect(() => {
    let localChats = [];
    if (conversations != undefined) {
      for (let conversation of conversations) {
        let our_message;
        if (conversation.conversation.startsWith(auth?.email)) {
          our_message = conversation.lastReadFirst;
        } else {
          our_message = conversation.lastReadSecond;
        }
        console.log(conversation.lastReadFirst, conversation.lastReadSecond);
        
        localChats.push({
          email: conversation.conversation
            .replace(auth?.email, "")
            .replace("-", ""),
          username: our_message?.author.username,
          avatar: our_message?.author.displayImg,
          lastMessageTime: our_message?.timestamp,
          unread: true,
          id: conversation.id,
          active: true,
        });
      }
    }
    setChats(localChats);
  }, [conversations]);

  console.log(conversations);
  return (
    <Template title="Chat Overview">
      <Box sx={{ padding: "20px" }}>
        <h3>Active Chats</h3>
        <Stack spacing={2}>
          {chats.filter(conversation => conversation.active).length > 0 ? (
            chats.filter(conversation => conversation.active).map((item) => {
              return <SingleChatOverview {...item} key={item.id} />;
            })
          ) : (
            <Typography>no active chats</Typography>
          )}
        </Stack>
        <h3>Inactive Chats</h3>
        <Stack spacing={2}>
        {chats.filter(conversation => !conversation.active).length > 0 ? (
            chats.filter(conversation => !conversation.active).map((item) => {
              return <SingleChatOverview {...item} key={item.id} />;
            })
          ) : (
            <Typography>no inactive chats</Typography>
          )}
        </Stack>
      </Box>
    </Template>
  );
};

export default ChatOverview;
