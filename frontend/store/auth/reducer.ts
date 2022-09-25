import { Auth } from "firebase/auth";
import { AuthActionProps, authActionTypes } from "./action";

interface AuthReducerProps {
  authStatus: Auth | null;
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
