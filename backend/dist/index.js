"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const cors_1 = __importDefault(require("cors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("./utils");
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_SECRET_KEY;
const app = (0, express_1.default)();
const PORT = process.env.PORT || 2000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/v1/signup", async (req, res) => {
    const reqSchema = zod_1.z.object({
        email: zod_1.z.string().email().min(3).max(100),
        password: zod_1.z
            .string()
            .min(8)
            .max(20)
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
        name: zod_1.z.string().min(3).max(10),
    });
    const parsed = reqSchema.safeParse(req.body);
    if (!parsed.success) {
        res
            .status(411)
            .json({ message: "Invalid input", error: parsed.error.errors });
        return;
    }
    const { email, password, name } = parsed.data;
    try {
        const existing = await db_1.UserModel.findOne({ email });
        if (existing) {
            res.status(403).json({ message: "User already exists" });
            return;
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        await db_1.UserModel.create({ email, password: hashed, name });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await db_1.UserModel.findOne({
            email: email,
        });
        if (!response) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        const matchpwd = await bcryptjs_1.default.compare(password, response.password);
        if (!matchpwd) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: response._id,
        }, JWT_KEY);
        res.status(200).json({
            message: "Signed in successfully",
            token,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error",
        });
    }
});
app.post("/api/v1/content", middleware_1.useMiddleware, async (req, res) => {
    try {
        const { link, type, title, content } = req.body;
        const newContent = await db_1.ContentModel.create({
            link,
            type,
            title,
            content,
            userId: req.userId,
        });
        res.status(200).json({
            message: "Content created",
            content: newContent,
        });
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Failed to add content" });
    }
});
app.get("/api/v1/content", middleware_1.useMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const content = await db_1.ContentModel.find({
            userId: userId,
        }).populate("userId", "username");
        if (!content) {
            res.status(404).json({ message: "No content found" });
            return;
        }
        res.status(200).json({
            message: "Succesfull",
            content: content,
        });
    }
    catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
});
app.delete("/api/v1/content/:id", middleware_1.useMiddleware, async (req, res) => {
    try {
        const contentId = req.params.id;
        const userId = req.userId;
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            res.status(400).json({
                messgae: "Content id is invalid",
            });
            return;
        }
        const deleted = await db_1.ContentModel.findOneAndDelete({
            _id: new mongoose_1.default.Types.ObjectId(contentId),
            userId: userId,
        });
        if (!deleted) {
            res.status(400).json({
                message: "content not found",
            });
            return;
        }
        res.status(200).json({
            message: "Content deleted successfully",
            success: true,
            deletedId: contentId,
        });
    }
    catch (error) {
        console.error("Error deleting content:", error);
        res.status(500).json({ message: "Failed to delete content" });
    }
});
app.post("/api/v1/brain/share", middleware_1.useMiddleware, async (req, res) => {
    try {
        const { share } = req.body;
        if (share) {
            const existingLink = await db_1.LinksModel.findOne({
                userId: req.userId,
            });
            if (existingLink) {
                res.json({
                    hash: existingLink.hash,
                });
                return;
            }
            const hash = (0, utils_1.random)(18);
            await db_1.LinksModel.create({
                userId: req.userId,
                hash: hash,
            });
            res.json({
                hash,
            });
        }
        else {
            const result = await db_1.LinksModel.deleteOne({
                userId: req.userId,
            });
            if (result.deletedCount === 0) {
                res.status(404).json({
                    messgae: "No link to remove",
                });
                return;
            }
            res.json({
                message: "Removed link",
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
        });
    }
});
app.get("/api/v1/brain/~:shareLink", middleware_1.useMiddleware, async (req, res) => {
    try {
        const hash = req.params.shareLink;
        const shareLink = await db_1.LinksModel.findOne({ hash });
        if (!shareLink) {
            res.status(404).json({
                message: "Share link not found",
            });
            return;
        }
        const content = await db_1.ContentModel.find({
            userId: shareLink.userId,
        }).sort({ createdAt: -1 });
        const user = await db_1.UserModel.findById(shareLink.userId);
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        res.json({
            username: user.name || user.email,
            content,
        });
    }
    catch (error) {
        console.error("Share content error:", error);
        res.status(500).json({
            message: "Server error",
            error: "Unknown error",
        });
    }
});
app.put("/api/v1/content/:id", middleware_1.useMiddleware, async (req, res) => {
    try {
        const contentId = req.params.id;
        const { content } = req.body;
        const userId = req.userId;
        if (!contentId || !content) {
            res.status(400).json({
                message: "Content ID and updated content are required",
            });
            return;
        }
        const updatedContent = await db_1.ContentModel.findOneAndUpdate({
            _id: contentId,
            userId: userId,
        }, {
            $set: { content },
        }, {
            new: true,
        });
        if (!updatedContent) {
            res.status(404).json({
                message: "Content not found or you don't have permission to update it",
            });
            return;
        }
        res.status(200).json({
            message: "Content updated successfully",
            content: updatedContent,
        });
    }
    catch (err) {
        console.error("Error updating content:", err);
        res.status(500).json({
            message: "Failed to update content",
        });
    }
});
const main = async () => {
    try {
        const start = Date.now();
        await mongoose_1.default.connect(process.env.MONGO_URL);
        const timeTaken = ((Date.now() - start) / 1000).toFixed(2);
        console.log(`✅ MongoDB connected in ${timeTaken}s`);
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1); // Crash early if DB connection fails
    }
};
main();
