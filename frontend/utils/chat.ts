import { User } from "./user";

export type Message = {
    id: number;
    text: string;
    author: User;
    timestamp: number;
};