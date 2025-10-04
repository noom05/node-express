"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("./controller/index");
const user_1 = require("./controller/user");
const body_parser_1 = __importDefault(require("body-parser"));
// import { jwtAuthen, generateToken } from "./jwtauth"; // ✅ import ทั้ง 2 ฟังก์ชันจากไฟล์เดียว
// dotenv.config();
exports.app = (0, express_1.default)();
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
exports.app.use(body_parser_1.default.text());
exports.app.use(body_parser_1.default.json());
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
exports.app.use("/", index_1.router);
exports.app.use("/users", user_1.router);
