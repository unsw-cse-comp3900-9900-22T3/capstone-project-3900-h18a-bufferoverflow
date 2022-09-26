import { User } from "firebase/auth";

export interface StoreProps {
  auth: User | null;
}

export const initialStore = {
  auth: null
}