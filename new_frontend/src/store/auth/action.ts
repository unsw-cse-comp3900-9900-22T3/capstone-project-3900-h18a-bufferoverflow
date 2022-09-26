import { PayloadAction } from "@reduxjs/toolkit";

export const authActionTypes = {
  SET_AUTH: "SET_AUTH"
} as const

export interface AuthProps {
  email: string;
  username: string;
  uid: string;
  token: string;
}

export interface AuthActionProps {
  auth: AuthProps | null;
}

export const setAuth = (auth: AuthProps | null): PayloadAction<AuthActionProps> => {
  return { type: authActionTypes.SET_AUTH, payload: { auth } }
}