import { createPool } from "mysql2/promise";

// import util from "util";

export const connection = createPool({
    host: "202.28.34.210",
    user: "66011212136",
    password: "66011212136",
    database: "db66011212136",
    port: 3309
});

// export const queryAsync = util.promisify(conn.query).bind(conn);