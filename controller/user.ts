import express from "express";
import mysql from "mysql2"; // ใช้สำหรับ format SQL
import { connection } from "../dbconnect";

// สร้าง Router
export const router = express.Router();

// ดึงข้อมูลผู้ใช้ทั้งหมด
router.get("/", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
});

// ดึงข้อมูลผู้ใช้ตาม uid
router.get("/:uid", async (req, res) => {
  const uid = +req.params.uid;
  try {
    const [rows] = await connection.query("SELECT * FROM users WHERE uid = ?", [uid]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการค้นหา" });
  }
});

// เพิ่มผู้ใช้ใหม่
router.post("/", async (req, res) => {
  const user = req.body;
  let sql = "INSERT INTO users (username, email, password, profile) VALUES (?, ?, ?, ?)";
  sql = mysql.format(sql, [user.username, user.email, user.password, user.profile]);

  try {
    const [result]: any = await connection.query(sql);
    res.status(201).json({ affected_row: result.affectedRows, last_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล" });
  }
});

// ลบผู้ใช้ตาม id
router.delete("/:id", async (req, res) => {
  const uid = +req.params.id;
  try {
    const [result]: any = await connection.query("DELETE FROM users WHERE uid = ?", [uid]);
    res.status(200).json({ affected_row: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบข้อมูล" });
  }
});

// แก้ไขข้อมูลผู้ใช้
router.put("/:uid", async (req, res) => {
  const uid = +req.params.uid;
  const user = req.body;

  let sql = "UPDATE users SET username=?, email=?, password=?, profile=? WHERE uid=?";
  sql = mysql.format(sql, [user.username, user.email, user.password, user.profile, uid]);

  try {
    const [result]: any = await connection.query(sql);
    res.status(200).json({ affected_row: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
  }
});
