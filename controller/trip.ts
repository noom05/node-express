import express from "express";
import { Trip } from "../model/trip";
import mysql from "mysql";
import { conn, queryAsync } from "../dbconnect";
import { ResultSetHeader } from "mysql2";


export const router = express.Router();

router.get("/", (req, res) => {
  conn.query("select * from trip", (err, result, fields) => {
    let trips = result as Trip[];
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  let id = +req.params.id;
  conn.query("select * from trip where idx = ?" , [id], (err, result, fields) => {
  if (err) throw err;
    res.json(result);
  });
});

router.post("/", (req, res) => {
  // Serialize the request body to Trip object
  let trip: Trip = req.body;
  let sql =
    "INSERT INTO `trip`(`name`, `country`, `destinationid`, `coverimage`, `detail`, `price`, `duration`) VALUES (?,?,?,?,?,?,?)";
  sql = mysql.format(sql, [
    // Easy to assign values to the query
    trip.name,
    trip.country,
    trip.destinationid,
    trip.coverimage,
    trip.detail,
    trip.price,
    trip.duration,
  ]);
  // conn.query(sql, (err, result) => {
  //   if (err) throw err;
  //   res
  //     .status(201)
  //     .json({ affected_row: result.affectedRows, last_idx: result.insertId });
  // });
  conn.query(sql, (err, result) => {
  if (err) throw err;
  const r = result as ResultSetHeader;
  res.status(201).json({ affected_row: r.affectedRows, last_idx: r.insertId });
});

});

router.get("/search/fields", (req, res) => {
  conn.query(
    "select * from trip where (idx IS NULL OR idx = ?) OR (name IS NULL OR name like ?)",
    [ req.query.idx, "%" + req.query.name + "%"],
    (err, result, fields) => {
    if (err) throw err;
      res.json(result);
    }
  );
});

router.delete("/:idx", (req, res) => {
  let idx = +req.params.idx;
  conn.query("delete from trip where idx = ?", [idx], (err, result) => {
  if (err) throw err;
  const r = result as ResultSetHeader;
  res.status(200).json({ affected_row: r.affectedRows });
});

});

