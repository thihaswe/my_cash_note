// utils/auth.js

import jwt from "jsonwebtoken";
import { parse } from "cookie";

export const isAuthenticated = (req: any) => {
  const cookies = parse(req.headers.cookie || "");

  if (!cookies.token) {
    return null;
  }

  try {
    const decoded = jwt.verify(cookies.token, "adefjjedjkdg");
    return decoded;
  } catch (error) {
    return null;
  }
};
