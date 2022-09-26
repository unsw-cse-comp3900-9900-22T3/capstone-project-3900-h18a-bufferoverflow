import { User } from "firebase/auth";

interface Store {
    auth: User | null;
}

export type StoreProps = Store | null