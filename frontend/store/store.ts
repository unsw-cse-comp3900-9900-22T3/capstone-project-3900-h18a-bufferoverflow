import { combineReducers, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { authReducer, AuthReducerProps } from "./auth/reducer";

export interface StoreStateProps {
  authReducer: AuthReducerProps;
}

const combineReducer = combineReducers({
  authReducer
})

const mainReducer = (state: StoreStateProps | undefined, action: PayloadAction<any>) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return combineReducer(state, action)
  }
}

const initStore = () => {
  return configureStore({
    reducer: mainReducer
  })
}

export const wrapper = createWrapper(initStore)