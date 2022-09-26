import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer, AuthReducerProps } from "./auth/reducer";

export interface StoreStateProps {
  authReducer: AuthReducerProps;
}

const combineReducer = combineReducers({
  authReducer
})

export const store = configureStore({
  reducer: combineReducer
})
