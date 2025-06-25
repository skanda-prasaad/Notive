import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { z } from "zod";
import cors from "cors";
import bcrypt from "bcryptjs";
import { UserModel } from "./db";
dotenv.config();

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
app.post("/api/v1/signin", (req: Request, res: Response) => {
  res.send("Signin route hit");
});

app.post("/api/v1/content", (req: Request, res: Response) => {
  res.send("Add content route hit");
});

app.get("/api/v1/content", (req: Request, res: Response) => {
  res.send("Get content route hit");
});

app.delete("/api/v1/content/:id", (req: Request, res: Response) => {
  res.send(`Delete content with ID ${req.params.id}`);
});

app.post("/api/v1/brain/share", (req: Request, res: Response) => {
  res.send("Create/remove share link");
});

app.get("/api/v1/brain/:shareLink", (req: Request, res: Response) => {
  res.send(`Get shared content by link ${req.params.shareLink}`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
