import { AuthActionProps, authActionTypes, AuthProps } from "./action";

export interface AuthReducerProps {
  authStatus: AuthProps | null;
}

const authInitialState: AuthReducerProps = {
  authStatus: null
}

export const authReducer = (state = authInitialState, action: AuthActionProps): AuthReducerProps => {
  switch (action.type) {
    case authActionTypes.SET_AUTH:
      return { ...state, authStatus: action.auth };
    default:
      return state;
  }
}
