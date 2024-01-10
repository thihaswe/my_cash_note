import { UserInitialState } from "@/types/user";
import { Gender } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState: UserInitialState = {
  item: {
    id: 0,
    username: "",
    password: "",
    gender: "" as Gender,
    dateOfBirth: "",
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
