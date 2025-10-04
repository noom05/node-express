"use strict";
// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// // ✅ เพิ่ม Type สำหรับ Request.user
// declare global {
//   namespace Express {
//     interface Request {
//       user?: any;
//     }
//   }
// }
// export const secret = "this-is-top-secret";
// // ✅ สร้าง token
// export function generateToken(payload: any): string {
//   return jwt.sign(payload, secret, {
//     expiresIn: "30d",
//     issuer: "CS-MSU",
//   });
// }
// // ✅ ตรวจสอบ token แบบ manual middleware
// export const jwtAuthen = (req: Request, res: Response, next: NextFunction): void => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     res.status(401).json({ message: "No authorization token was found" });
//     return;
//   }
//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, secret);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(403).json({ message: "Invalid or expired token" });
//   }
// }
