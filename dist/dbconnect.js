"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const promise_1 = require("mysql2/promise");
// import util from "util";
exports.connection = (0, promise_1.createPool)({
    host: "202.28.34.210",
    user: "66011212136",
    password: "66011212136",
    database: "db66011212136",
    port: 3309
});
// export const queryAsync = util.promisify(conn.query).bind(conn);
