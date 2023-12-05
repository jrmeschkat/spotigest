import { createContext } from "react";

export interface IUser {
  username: string;
  isAdmin: boolean;
}

export const UserContext = createContext<IUser | undefined>(undefined);
