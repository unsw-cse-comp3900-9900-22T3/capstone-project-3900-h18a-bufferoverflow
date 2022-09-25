import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authReducer, AuthReducerProps } from "./auth/reducer";

export interface StoreStateProps {
  authReducer: AuthReducerProps;
}

const combineReducer = combineReducers({
  authReducer
})

const initStore = () => {
  return configureStore({
    reducer: combineReducer
  })
}

export const wrapper = createWrapper(initStore)