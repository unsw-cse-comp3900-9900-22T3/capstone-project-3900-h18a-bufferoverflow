import { Auth } from "firebase/auth"

export const authActionTypes = {
  SET_AUTH: "SET_AUTH"
} as const

export interface AuthActionProps {
  type: typeof authActionTypes[keyof typeof authActionTypes];
  auth: Auth | null;
}

export const setAuth = (auth: Auth | null): AuthActionProps => {
  return { type: authActionTypes.SET_AUTH, auth: auth }
}