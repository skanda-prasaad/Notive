"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_KEY = process.env.JWT_SECRET_KEY;
const useMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith("Bearer ")) {
            res.status(401).json({ message: "Token missing.." });
            return;
        }
        const token = authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, JWT_KEY);
        if (typeof decoded === "string") {
            res.status(403).json({ message: "Invalid token format" });
            return;
        }
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.useMiddleware = useMiddleware;
