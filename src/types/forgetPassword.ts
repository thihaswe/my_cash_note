import { User } from "@prisma/client";
import { BaseOptions } from "./app";

export interface ForgetPassword extends BaseOptions {
  username: string;
  gender: string;
  dateOfBirth: string;
}

export interface ForgetPasswordInitialState {
  wrongInfo: boolean;
  isLoading: boolean;
  error: Error | null;
}
