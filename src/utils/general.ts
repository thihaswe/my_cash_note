import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
export const generateToken = (user: User) => {
  // The payload is the information you want to encode in the token
  const payload: User = user;
  // Add any additional claims you need
  // The secret key is used to sign the token
  const secretKey = "adefjjedjkdg"; // Replace with your actual secret key
  // The expiresIn option defines the token's expiration time
  const expiresIn = "1h"; // Token will expire in 1 hour
  // Sign the token
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

export const verifyToken = (token: string) => {
  const secretKey = "adefjjedjkdg"; // Replace with your actual secret key

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded as User;
  } catch (error: any) {
    // Token verification failed
    console.error("Token verification failed:", error.message);
    return null;
  }
};

// Example usage
// const token = generateToken(user);
// console.log("JWT Token:", token);
// Example usage
//   const decodedToken = verifyToken(token);
//   if (decodedToken) {
//     console.log('Decoded Token:', decodedToken);
//     // You can access the userId and other claims from decodedToken
//   }

export const getCookieValue = (cookieName: string) => {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

// Example usage:
// const accessToken = getCookieValue("accessToken");
// Now 'accessToken' contains the value of the 'accessToken' cookie, or it's null if the cookie doesn't exist.
