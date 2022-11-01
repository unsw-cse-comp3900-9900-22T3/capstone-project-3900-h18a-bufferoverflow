import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { Stack, Box } from "@mui/system";
import {
  SingleChatOverview,
  SingleChatOverviewProps,
} from "../../components/chat/single-chat";
import { Message, ConversationGraphqlProps } from "../../utils/chat";
import { gql, useLazyQuery } from "@apollo/client";
import { useStore } from "../../store/store";
import { Typography } from "@mui/material";

const GET_CONVERSATIONS_QUERY = gql`
  query getConversationsQuery($involving: String!) {
    getConversationsForOverview(involving: $involving) {
      conversations {
        id
        conversation
        username
        email
        displayImg
        latest {
          timestamp
        }
        unread
      }
    }
  }
`;

type ConversationOverview = {
  id: number;
  conversation: string;
  username: string;
  email: string;
  displayImg: string;
  latest: Message;
  unread: boolean;
}

const ChatOverview: NextPage = () => {
  const [conversations, setConversations] = useState<Array<ConversationOverview>>([]);

  const { auth } = useStore();
  const [getConversations, { loading, error, data }] =
    useLazyQuery<ConversationGraphqlProps>(GET_CONVERSATIONS_QUERY);
  useEffect(() => {
    if (auth?.email != undefined) {
      getConversations({ variables: { involving: auth?.email } });
      setConversations(data?.getConversationsForOverview.conversations);
    }
  }, [auth, data]);

  const [chats, setChats] = useState<Array<SingleChatOverviewProps>>([]);
  useEffect(() => {
    // console.log(conversations, latestMessages);
    let localChats = [];
    if (conversations != undefined) {
      conversations.forEach((conversation, i) => {
        localChats.push({
          email: conversation.email,
          username: conversation.username,
          avatar: conversation.displayImg,
          lastMessageTime: conversation.latest?.timestamp,
          unread: conversation.unread,
          id: conversation.id,
          active: conversation.latest ? (Date.now() - conversation.latest?.timestamp) < (1000 * 60 * 60 * 24 * 7) : true, 
        });
      });
    }
    setChats(localChats);
  }, [conversations]);

  return (
    <Template title="Chat Overview">
      <Box sx={{ padding: "20px" }}>
        <h3>Active Chats</h3>
        <Stack spacing={2}>
          {chats.filter((conversation) => conversation.active).length > 0 ? (
            chats
              .filter((conversation) => conversation.active)
              .map((item) => {
                return <SingleChatOverview {...item} key={item.id} />;
              })
          ) : (
            <Typography>no active chats</Typography>
          )}
        </Stack>
        <h3>Inactive Chats</h3>
        <Stack spacing={2}>
          {chats.filter((conversation) => !conversation.active).length > 0 ? (
            chats
              .filter((conversation) => !conversation.active)
              .map((item) => {
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
