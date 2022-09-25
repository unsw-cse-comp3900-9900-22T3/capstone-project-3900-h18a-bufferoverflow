import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authReducer } from "./auth/reducer";


const combineReducer = combineReducers({
  // add more reducers here if needed
  authReducer
})

const initStore = () => {
  return configureStore({
    reducer: combineReducer
  })
}

export const wrapper = createWrapper(initStore)