import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/Process";
export const generateJWT = (payload: JwtPayload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
export const verifyJWT = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
