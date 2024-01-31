import { Gender } from "@prisma/client";
import { BaseOptions } from "./app";

export interface SignUp extends BaseOptions {
  username: string;
  password: string;
  gender: Gender;
  dateOfBirth: string;
}
