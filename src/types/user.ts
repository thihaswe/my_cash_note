import { User } from "@prisma/client";

export interface UserInitialState {
  item: User;
  isLoading: boolean;
  error: Error | null;
}
