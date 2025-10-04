import express from 'express';
import { conn } from '../dbconnect';

export const router = express.Router();

router.get("/", (req, res) => {
    conn.query("SELECT * FROM students", (err, result, fields) => {
        if (err) {
            console.log("DB Error: ", err);
            res.status(500).send("Database error");
            return;
        }
        res.json(result);
    });
});

