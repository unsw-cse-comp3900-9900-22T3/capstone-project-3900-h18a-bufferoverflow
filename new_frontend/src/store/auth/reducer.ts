import { PayloadAction } from "@reduxjs/toolkit";
import { AuthActionProps, authActionTypes, AuthProps } from "./action";

export interface AuthReducerProps {
  authStatus: AuthProps | null;
}

const authInitialState: AuthReducerProps = {
  authStatus: null
}

export const authReducer = (
  state = authInitialState,
  action: PayloadAction<AuthActionProps>
): AuthReducerProps => {
  switch (action.type) {
    case authActionTypes.SET_AUTH:
      return { ...state, authStatus: action.payload.auth };
    default:
      return state;
  }
}
