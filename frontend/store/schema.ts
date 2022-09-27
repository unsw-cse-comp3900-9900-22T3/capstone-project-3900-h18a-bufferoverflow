import { User } from "firebase/auth";

interface AuthProps {
  token: string;
  email: string;
  username: string;
  uid: string;
}

export interface StoreProps {
  auth: AuthProps | null;
}

export const initialStore = {
  auth: null
}