import { User } from "@prisma/client";

export interface ForgetPassword {
  username: string;
  gender: string;
  dateOfBirth: string;
}

export interface ForgetPasswordInitialState {
  wrongInfo: boolean;
  isLoading: boolean;
  error: Error | null;
}
