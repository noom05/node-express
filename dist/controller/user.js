"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2")); // ใช้สำหรับ format SQL
const dbconnect_1 = require("../dbconnect");
// สร้าง Router
exports.router = express_1.default.Router();
// ดึงข้อมูลผู้ใช้ทั้งหมด
exports.router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield dbconnect_1.connection.query("SELECT * FROM users");
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
    }
}));
// ดึงข้อมูลผู้ใช้ตาม uid
exports.router.get("/:uid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = +req.params.uid;
    try {
        const [rows] = yield dbconnect_1.connection.query("SELECT * FROM users WHERE uid = ?", [uid]);
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการค้นหา" });
    }
}));
// เพิ่มผู้ใช้ใหม่
exports.router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    let sql = "INSERT INTO users (username, email, password, profile) VALUES (?, ?, ?, ?)";
    sql = mysql2_1.default.format(sql, [user.username, user.email, user.password, user.profile]);
    try {
        const [result] = yield dbconnect_1.connection.query(sql);
        res.status(201).json({ affected_row: result.affectedRows, last_id: result.insertId });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล" });
    }
}));
// ลบผู้ใช้ตาม id
exports.router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = +req.params.id;
    try {
        const [result] = yield dbconnect_1.connection.query("DELETE FROM users WHERE uid = ?", [uid]);
        res.status(200).json({ affected_row: result.affectedRows });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบข้อมูล" });
    }
}));
// แก้ไขข้อมูลผู้ใช้
exports.router.put("/:uid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = +req.params.uid;
    const user = req.body;
    let sql = "UPDATE users SET username=?, email=?, password=?, profile=? WHERE uid=?";
    sql = mysql2_1.default.format(sql, [user.username, user.email, user.password, user.profile, uid]);
    try {
        const [result] = yield dbconnect_1.connection.query(sql);
        res.status(200).json({ affected_row: result.affectedRows });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
    }
}));
