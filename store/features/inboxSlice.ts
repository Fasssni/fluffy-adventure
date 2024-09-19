import { IUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  currentMessage: [],
};

const inboxSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("action", action);
      return action.payload;
    },
    getCurrentMessages: (state, action) => {
      return { ...state, currentMessage: action.payload };
    },
    addNewMessage: (state, action) => {
      return {
        ...state,
        currentMessage: [...state.currentMessage, action.payload],
      };
    },
  },
});

export const { setUser } = inboxSlice.actions;

export default inboxSlice.reducer;
