import { createSlice } from "@reduxjs/toolkit";
const isBrowser = typeof window !== "undefined";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated:
      isBrowser && document.cookie.includes("token=") ? true : false,
    // other authentication-related state
  },
  reducers: {
    login: (state, action) => {
      // handle login logic
      document.cookie = `token=${action.payload}`;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      // handle logout logic
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
