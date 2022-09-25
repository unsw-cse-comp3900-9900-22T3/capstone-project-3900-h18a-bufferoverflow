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
  type: typeof authActionTypes[keyof typeof authActionTypes];
  auth: AuthProps | null;
}

export const setAuth = (auth: AuthProps | null): AuthActionProps => {
  return { type: authActionTypes.SET_AUTH, auth }
}