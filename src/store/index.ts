import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../store/slices/app";
import forgetPasswordReducer from "../store/slices/forgetPassword";
import userReducer from "../store/slices/user";
import noteReducer from "../store/slices/note";
import authReducer from "../store/slices/auth";

export const store = configureStore({
  reducer: {
    app: appReducer,
    forgetPassword: forgetPasswordReducer,
    user: userReducer,
    note: noteReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
