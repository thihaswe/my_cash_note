import { SignUp } from "@/types/signUp";
import { UserInitialState } from "@/types/user";
import { config } from "@/utils/config";
import { Gender } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setInfo } from "./forgetPassword";

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

export const singUpThunk = createAsyncThunk(
  "user/signUpThunk",
  async (options: SignUp, thunkApi) => {
    const { onSuccess, onError, ...option } = options;
    try {
      const respone = await fetch(`${config.apiBaseUrl}/sign-up`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(option),
      });

      const data = await respone.json();

      if (data === "Bad Request") {
        thunkApi.dispatch(setInfo(true));
      } else {
        thunkApi.dispatch(setUser(data));
        onSuccess && onSuccess();
      }
    } catch (error) {
      onError && onError();
    }
  }
);

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
