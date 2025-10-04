import express from "express";
import { router as index } from "./controller/index";
import bodyParser from "body-parser";
import cors from "cors";
import { jwtAuthen, generateToken, secret } from "./jwtauth";
import { router as user } from "./controller/user";


export const app = express();

const allowedOrigins = [
  "http://127.0.0.1:5500", // Your local development frontend (e.g., Vite default)
  "http://localhost:3000", // Another local dev frontend (e.g., Create React App default)
  "https://your-production-frontend.com", // Your production frontend domain
  "https://another-approved-domain.org", // Another approved domain
  // Add more origins as needed
];

app.use(
  cors({
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
  })
);

app.use(jwtAuthen, (err: any, req: any, res: any, next: any) => {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send({ message: err.message });
    return;
  }
  next();
});

// Test Token
app.use("/testtoken", (req, res) => {
    const payload: any = { username: "Aj.M" }; 
    const jwttoken = generateToken(payload, secret);
  res.status(200).json({
    token: jwttoken,
  });
});

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/", index); 

app.use("/user", user);
