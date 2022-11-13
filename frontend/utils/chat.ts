import { User, UserGraphqlProps } from "./user";

export type Message = {
  id: number;
  text: string;
  author: User;
  timestamp: number;
};

export interface MessageGraphqlProps {
  getMessages: {
    success: boolean;
    errors: string[] | null;
    messages: Message[] | null;
  };
}

export type Conversation = {
  id: number;
  conversation: string;
  lastReadFirst: Message;
  lastReadSecond: Message;
};

export interface ConversationGraphqlProps {
  getConversations: {
    success: boolean;
    errors: string[] | null;
    conversations: Conversation[] | null;
  };
}
