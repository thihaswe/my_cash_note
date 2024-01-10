import { AppInitialState } from "@/types/app";
import { AppOptions } from "@/types/app";
import { config } from "@/utils/config";
import { Gender, User } from "@prisma/client";
import { Payload } from "@prisma/client/runtime/library";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setuid } from "process";

const initialState: AppInitialState = {
  init: false,
  usernameFalse: false,
  passwordFalse: false,
  isLoading: false,
  error: null,
};

export const appSliceThunk = createAsyncThunk(
  "app/appsliceThunk",
  async (options: AppOptions, thunkApi) => {
    const { onSuccess, onError, ...logInData } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/app`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(logInData),
      });
      const data = await response.json();
      if (data === "Bad Request1") {
        thunkApi.dispatch(setUsername(true));
      } else if (data === "Bad Request2") {
        thunkApi.dispatch(setPassword(true));
      } else {
        thunkApi.dispatch(setUsername(false));
        thunkApi.dispatch(setPassword(false));
        onSuccess && onSuccess();
      }
    } catch (error) {}
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<boolean>) => {
      state.usernameFalse = action.payload;
    },
    setPassword: (state, action: PayloadAction<boolean>) => {
      state.passwordFalse = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {},
  },
});

export const { setUsername, setPassword } = appSlice.actions;
export default appSlice.reducer;
