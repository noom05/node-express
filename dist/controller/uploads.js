"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
exports.router = express_1.default.Router();
class FileMiddleware {
    constructor() {
        this.filename = "";
        this.diskLoader = (0, multer_1.default)({
            storage: multer_1.default.diskStorage({
                // Set the destination folder for the uploaded files
                destination: (_req, _file, cb) => {
                    cb(null, path_1.default.join(__dirname, "../uploads"));
                },
                // Set the unique filename for the uploaded file
                filename: (req, file, cb) => {
                    const uniqueSuffix = (0, uuid_1.v4)();
                    this.filename = uniqueSuffix + "." + file.originalname.split(".").pop();
                    cb(null, this.filename);
                },
            }),
            limits: {
                fileSize: 67108864, // 64 MByte
            },
        });
        const uploadsDir = path_1.default.join(__dirname, "../uploads");
        if (!fs_1.default.existsSync(uploadsDir)) {
            fs_1.default.mkdirSync(uploadsDir, { recursive: true });
        }
    }
}
const fileUpload = new FileMiddleware();
// Route to upload a file
exports.router.post("/", fileUpload.diskLoader.single("file"), (req, res) => {
    res.json({ filename: fileUpload.filename });
});
// Route to download a file
exports.router.get("/:filename", (req, res) => {
    const filename = req.params.filename;
    const download = req.query.download || undefined;
    if (download === "true") {
        res.download(path_1.default.join(__dirname, "../uploads", filename));
    }
    else {
        res.sendFile(path_1.default.join(__dirname, "../uploads", filename));
    }
});
