import { User } from "@prisma/client";

export interface AppInitialState {
  init: boolean;
  isLoading: boolean;
  error: Error | null;
  usernameFalse: boolean;
  passwordFalse: boolean;
}
export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface AppOptions extends BaseOptions {
  username?: string;
  password?: string;
  accessToken?: string;
}
