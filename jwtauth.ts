import { expressjwt, Request as JWTRequest } from "express-jwt";
import jwt from "jsonwebtoken";

export const secret = "this-is-top-secret";
export const jwtAuthen = expressjwt({
  secret: secret,
  algorithms: ["HS256"],
}).unless({
  path: ["/", "/register", "/login", "/testtoken"," /user"],
});

export function generateToken(payload: any, secretKey: string): string {
  return jwt.sign(payload, secretKey, {
    expiresIn: "30d",
    issuer: "CS-MSU"
  });
}


export function verifyToken(token: string, secretKey: string) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: JSON.stringify(error) };
  }
}
