import { IUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser = {
  email: "",
  id: null,
  name: "",
  surname: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("action", action);
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
