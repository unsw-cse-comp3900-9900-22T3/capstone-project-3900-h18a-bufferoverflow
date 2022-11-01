import { User } from "./user";

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