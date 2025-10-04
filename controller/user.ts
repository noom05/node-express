import express from "express";
import mysql from "mysql";
import { conn } from "../dbconnect";
import { ResultSetHeader } from "mysql2";

// สร้าง Router
export const router = express.Router();

// ดึงข้อมูลผู้ใช้ทั้งหมด
router.get("/", (req, res) => {
  conn.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
    }
    res.json(result);
  });
});

// ดึงข้อมูลผู้ใช้ตาม uid
router.get("/:uid", (req, res) => {
  const uid = +req.params.uid;
  conn.query("SELECT * FROM user WHERE id = ?", [uid], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "เกิดข้อผิดพลาดในการค้นหา" });
    }
    res.json(result);
  });
});

// เพิ่มผู้ใช้ใหม่
router.post("/", (req, res) => {
  const user = req.body;
  let sql = "INSERT INTO user (username, email, password, picUrl) VALUES (?, ?, ?, ?)";
  sql = mysql.format(sql, [user.username, user.email, user.password, user.picUrl]);

  conn.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล" });
    }
    const r = result as ResultSetHeader;
    res.status(201).json({ affected_row: r.affectedRows, last_id: r.insertId });
  });
});

// ลบผู้ใช้ตาม id
router.delete("/:id", (req, res) => {
  const id = +req.params.id;
  conn.query("DELETE FROM user WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบข้อมูล" });
    }
    const r = result as ResultSetHeader;
    res.status(200).json({ affected_row: r.affectedRows });
  });
});

// แก้ไขข้อมูลผู้ใช้
router.put("/:id", (req, res) => {
  const id = +req.params.id;
  const user = req.body;

  let sql = "UPDATE user SET username=?, email=?, password=?, picUrl=? WHERE id=?";
  sql = mysql.format(sql, [user.username, user.email, user.password, user.picUrl, id]);

  conn.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
    }
    const r = result as ResultSetHeader;
    res.status(200).json({ affected_row: r.affectedRows });
  });
});
