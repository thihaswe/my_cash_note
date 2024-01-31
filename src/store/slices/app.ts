import { AppInitialState } from "@/types/app";
import { AppOptions } from "@/types/app";
import { config } from "@/utils/config";
import { Gender, User } from "@prisma/client";
import { Payload } from "@prisma/client/runtime/library";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setuid } from "process";
import user, { setUser } from "./user";
import { setNote } from "./note";
import { login, logout } from "./auth";
import { useRouter } from "next/router";

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
      } else if (data === "Unauthorized") {
        thunkApi.dispatch(logout());
      } else {
        const { user, notes, token } = data;

        thunkApi.dispatch(setUsername(false));
        thunkApi.dispatch(setPassword(false));
        thunkApi.dispatch(setUser(user));
        thunkApi.dispatch(setNote(notes));
        thunkApi.dispatch(login(token));
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
  },
});

export const { setUsername, setPassword } = appSlice.actions;
export default appSlice.reducer;
