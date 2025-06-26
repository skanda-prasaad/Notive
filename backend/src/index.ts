import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { z } from "zod";
import cors from "cors";
import bcrypt from "bcryptjs";
import { ContentModel, UserModel } from "./db";
import jwt from "jsonwebtoken";
import { useMiddleware } from "./middleware";
import mongoose, { Mongoose } from "mongoose";
dotenv.config();
const JWT_KEY = process.env.JWT_SECRET_KEY;
const app = express();
const PORT = process.env.PORT || 2000;

// Middlewares
app.use(cors());
app.use(express.json());

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const reqSchema = z.object({
    email: z.string().email().min(3).max(100),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    name: z.string().min(3).max(10),
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
    const existing = await UserModel.findOne({ email });
    if (existing) {
      res.status(403).json({ message: "User already exists" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    await UserModel.create({ email, password: hashed, name });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const response = await UserModel.findOne({
      email: email,
    });
    if (!response) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    const matchpwd = await bcrypt.compare(
      password,
      response.password as string
    );
    if (!matchpwd) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign(
      {
        id: response._id,
      },
      JWT_KEY as string
    );

    res.status(200).json({
      message: "Signed in successfully",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

interface ContentRequestBody {
  link: string;
  type: string;
  title: string;
  content?: string;
}

interface CustomRequest<T = any> extends Request {
  userId?: string;
  body: T;
}

app.post(
  "/api/v1/content",
  useMiddleware,
  async (req: CustomRequest<ContentRequestBody>, res: Response) => {
    try {
      const { link, type, title, content } = req.body;
      const newContent = await ContentModel.create({
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
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ message: "Failed to add content" });
    }
  }
);

app.get("/api/v1/content", async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  try {
    const content = await ContentModel.find({
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
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete(
  "/api/v1/content/:id",
  useMiddleware,
  async (req: CustomRequest, res: Response) => {
    try {
      const contentId = req.params.id;
      const userId = req.userId;

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        res.status(400).json({
          messgae: "Content id is invalid",
        });
        return;
      }
      const deleted = await ContentModel.findByIdAndDelete({
        _id: new mongoose.Types.ObjectId(contentId),
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
    } catch (error) {
      console.error("Error deleting content:", error);
      res.status(500).json({ message: "Failed to delete content" });
    }
  }
);

app.post("/api/v1/brain/share", (req: Request, res: Response) => {
  
});

app.get("/api/v1/brain/:shareLink", (req: Request, res: Response) => {
  res.send(`Get shared content by link ${req.params.shareLink}`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
