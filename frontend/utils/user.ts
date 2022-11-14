export type User = {
  username: string;
  displayImg: string;
  id: number;
  address: string;
};

export interface UserGraphqlProps {
  getUser: {
    success: boolean | null;
    errors: string[] | null;
    user: User | null;
  };
}