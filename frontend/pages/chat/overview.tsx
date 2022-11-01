import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { Stack, Box } from "@mui/system";
import {
  SingleChatOverview,
  SingleChatOverviewProps,
} from "../../components/chat/single-chat";
import { Message, MessageGraphqlProps } from "../../utils/chat";
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

const GET_CONVERSATION_MESSAGES_QUERY = gql`
  query getConversationMessagesQuery($conversation: String!) {
    getMessages(conversation: $conversation) {
      messages {
        id
        timestamp
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

  const [getConversationMessagesQuery, messageResults] =
    useLazyQuery<MessageGraphqlProps>(GET_CONVERSATION_MESSAGES_QUERY);

  const messageData = messageResults.data;

  const [latestMessages, setLatestMessages] = useState<Array<Message>>([]);
  useEffect(() => {
    let latest = [];
    console.log("aaaah", messageResults);
    if (conversations != undefined && messageData != undefined) {
      conversations.forEach((conversation, i) => {
        getConversationMessagesQuery({ variables: { conversation: conversation } });
        latest[i] = (messageData?.getMessages.messages.pop())
      });
    }
    setLatestMessages(latest);
  }, [conversations, messageData]);

  const [chats, setChats] = useState<Array<SingleChatOverviewProps>>([]);
  useEffect(() => {
    // console.log(conversations, latestMessages);
    let localChats = [];
    if (conversations != undefined && latestMessages != undefined) {
      conversations.forEach((conversation, i) => {
        let our_message;
        if (conversation.conversation.startsWith(auth?.email)) {
          our_message = conversation.lastReadFirst;
        } else {
          our_message = conversation.lastReadSecond;
        }

        localChats.push({
          email: conversation.conversation
            .replace(auth?.email, "")
            .replace("-", ""),
          username: our_message?.author.username,
          avatar: our_message?.author.displayImg,
          lastMessageTime: our_message?.timestamp,
          unread: true,
          // unread: our_message.id == latestMessages[i].id,
          id: conversation.id,
          active: true,
          // active: (Date.now() - latestMessages[i].timestamp) < (1000 * 60 * 60 * 24 * 7),
        });
      });
    }
    setChats(localChats);
  }, [latestMessages]);

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
