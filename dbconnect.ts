// import mysql from "mysql";
import util from "util";


// export const conn = mysql.createPool({
//   connectionLimit: 10,
//   host: "202.28.34.197",
//   // port: 3309,
//   user: "tripbooking",
//   password: "tripbooking@csmsu",
//   database: "tripbooking",
// });

import mysql from "mysql2";

export const conn = mysql.createPool({
  connectionLimit: 10,
  host: "sql.freedb.tech",
  user: "freedb_lunire",
  password: "#bd!RGdruUNzX8n",
  database: "freedb_game_database",
});

export const queryAsync = util.promisify(conn.query).bind(conn);