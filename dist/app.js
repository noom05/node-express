"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("./controller/index");
const trip_1 = require("./controller/trip");
const body_parser_1 = __importDefault(require("body-parser"));
const students_1 = require("./controller/students");
const uploads_1 = require("./controller/uploads");
const cors_1 = __importDefault(require("cors"));
const jwtauth_1 = require("./jwtauth");
exports.app = (0, express_1.default)();
const allowedOrigins = [
    "http://127.0.0.1:5500", // Your local development frontend (e.g., Vite default)
    "http://localhost:3000", // Another local dev frontend (e.g., Create React App default)
    "https://your-production-frontend.com", // Your production frontend domain
    "https://another-approved-domain.org", // Another approved domain
    // Add more origins as needed
];
exports.app.use((0, cors_1.default)({
    //  origin: function (origin, callback) {
    //   // Check if the origin of the request is in our whitelist
    //   if (!origin || allowedOrigins.indexOf(origin) !== -1) {
    //     callback(null, true); // Allow the request
    //   } else {
    //     callback(new Error("Not allowed by CORS")); // Deny the request
    //   }
    // },
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
exports.app.use(jwtauth_1.jwtAuthen, (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(err.status).send({ message: err.message });
        return;
    }
    next();
});
// Test Token
exports.app.use("/testtoken", (req, res) => {
    const payload = { username: "Aj.M" };
    const jwttoken = (0, jwtauth_1.generateToken)(payload, jwtauth_1.secret);
    res.status(200).json({
        token: jwttoken,
    });
});
exports.app.use(body_parser_1.default.text());
exports.app.use(body_parser_1.default.json());
exports.app.use("/", index_1.router);
exports.app.use("/trip", trip_1.router);
exports.app.use("/upload", uploads_1.router);
exports.app.use("/uploads", express_1.default.static("uploads"));
exports.app.use("/students", students_1.router);
