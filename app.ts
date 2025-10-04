import express, { Request, Response, NextFunction } from "express";
import { router as index } from "./controller/index";
import { router as user } from "./controller/user";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// import { jwtAuthen, generateToken } from "./jwtauth"; // ✅ import ทั้ง 2 ฟังก์ชันจากไฟล์เดียว

// dotenv.config();

export const app = express();

// const allowedOrigins = [
//   "http://127.0.0.1:5500",
//   "http://localhost:3000",
//   "https://your-production-frontend.com",
//   "https://another-approved-domain.org",
// ];

// // ✅ ตั้งค่า CORS
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// ✅ ต้องใส่ body parser ก่อน route ที่ใช้ req.body
app.use(bodyParser.text());
app.use(bodyParser.json());

// // ✅ ใช้ middleware ตรวจสอบ JWT
// app.use(jwtAuthen);

// // ✅ Middleware สำหรับจัดการ error ของ jwtAuthen
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err.name === "UnauthorizedError") {
//     res.status(err.status || 401).send({ message: err.message });
//     return;
//   }
//   next();
// });

// // ✅ Route ทดสอบสร้าง Token
// app.get("/testtoken", (req: Request, res: Response) => {
//   const payload = { username: "Aj.M" };
//   const jwttoken = generateToken(payload);
//   res.status(200).json({ token: jwttoken });
// });

// ✅ Routes อื่นๆ
app.use("/", index);
app.use("/users", user);
