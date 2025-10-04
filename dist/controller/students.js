"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const dbconnect_1 = require("../dbconnect");
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => {
    dbconnect_1.conn.query("SELECT * FROM students", (err, result, fields) => {
        if (err) {
            console.log("DB Error: ", err);
            res.status(500).send("Database error");
            return;
        }
        res.json(result);
    });
});
