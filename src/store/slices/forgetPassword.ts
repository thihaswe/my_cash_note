import { ForgetPasswordInitialState } from "@/types/forgetPassword";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ForgetPasswordInitialState = {
  wrongInfo: false,
  isLoading: false,
  error: null,
};
const ForgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.wrongInfo = action.payload;
    },
  },
});

export const { setInfo } = ForgetPasswordSlice.actions;
export default ForgetPasswordSlice.reducer;
