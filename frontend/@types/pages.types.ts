import { GraphqlListing } from "./component.types";

export type User = {
  username: string;
  displayImg: string;
  id: number;
  address?: string;
};
export interface UserGraphqlProps {
  getUser: {
    success: boolean | null;
    errors: string[] | null;
    user: User | null;
  };
}

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

export interface DefaultFeedGraphqlProps {
  defaultFeed: {
    success: boolean | null;
    errors: string[] | null;
    listings: GraphqlListing[] | null;
  };
}

export interface SearchGraphqlProps {
  searchListings: {
    success: boolean | null;
    erorrs: string[] | null;
    listings: GraphqlListing[];
  };
}

export interface MyListingsGraphqlProps {
  getListingsByUser: {
    success: boolean | null;
    erorrs: string[] | null;
    listings: GraphqlListing[] | null;
  };
}

export interface FollowingTraderProps {
  displayImg: string;
  username: string;
  email: string;
}

export interface ProfileGraphqlProps {
  getUser: {
    success: boolean | null;
    errors: string[] | null;
    user: {
      displayImg: string;
      username: string;
      community: string;
      bio: string;
      address: string;
    } | null;
  }
}