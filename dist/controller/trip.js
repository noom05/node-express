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
const mysql_1 = __importDefault(require("mysql"));
const dbconnect_1 = require("../dbconnect");
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => {
    dbconnect_1.conn.query("select * from trip", (err, result, fields) => {
        let trips = result;
        res.json(result);
    });
});
exports.router.get("/:id", (req, res) => {
    let id = +req.params.id;
    dbconnect_1.conn.query("select * from trip where idx = ?", [id], (err, result, fields) => {
        if (err)
            throw err;
        res.json(result);
    });
});
exports.router.post("/", (req, res) => {
    // Serialize the request body to Trip object
    let trip = req.body;
    let sql = "INSERT INTO `trip`(`name`, `country`, `destinationid`, `coverimage`, `detail`, `price`, `duration`) VALUES (?,?,?,?,?,?,?)";
    sql = mysql_1.default.format(sql, [
        // Easy to assign values to the query
        trip.name,
        trip.country,
        trip.destinationid,
        trip.coverimage,
        trip.detail,
        trip.price,
        trip.duration,
    ]);
    dbconnect_1.conn.query(sql, (err, result) => {
        if (err)
            throw err;
        res
            .status(201)
            .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});
exports.router.get("/search/fields", (req, res) => {
    dbconnect_1.conn.query("select * from trip where (idx IS NULL OR idx = ?) OR (name IS NULL OR name like ?)", [req.query.idx, "%" + req.query.name + "%"], (err, result, fields) => {
        if (err)
            throw err;
        res.json(result);
    });
});
exports.router.delete("/:idx", (req, res) => {
    let idx = +req.params.idx;
    dbconnect_1.conn.query("delete from trip where idx = ?", [idx], (err, result) => {
        if (err)
            throw err;
        res
            .status(200)
            .json({ affected_row: result.affectedRows });
    });
});
exports.router.put("/:idx", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let idx = +req.params.idx;
    let trip = req.body;
    let sql = mysql_1.default.format("select * from trip where idx = ?", [idx]);
    // Execute the query and get the result
    let result = (yield (0, dbconnect_1.queryAsync)(sql));
    // Convert the result to a JSON string (to be shown)
    console.log(JSON.stringify(result));
    if (result.length > 0) {
        // Get the original trip data from the database
        let tripOriginal = result[0];
        console.log(tripOriginal);
        // Merge the original trip data with the new trip data
        let updateTrip = Object.assign(Object.assign({}, tripOriginal), trip);
        console.log("updateTrip");
        console.log(updateTrip);
        sql =
            "update  `trip` set `name`=?, `country`=?, `destinationid`=?, `coverimage`=?, `detail`=?, `price`=?, `duration`=? where `idx`=?";
        sql = mysql_1.default.format(sql, [
            updateTrip.name,
            updateTrip.country,
            updateTrip.destinationid,
            updateTrip.coverimage,
            updateTrip.detail,
            updateTrip.price,
            updateTrip.duration,
            idx,
        ]);
        dbconnect_1.conn.query(sql, (err, result) => {
            if (err)
                throw err;
            res.status(201).json({ affected_row: result.affectedRows });
        });
    }
    else {
        res.status(404).json({ message: "Trip not found" });
    }
}));
