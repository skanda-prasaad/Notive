import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express" {
  export interface Request {
    userId?: string;
  }
}

const JWT_KEY = process.env.JWT_SECRET_KEY;

export const useMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token missing.." });
      return;
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_KEY as string);

    if (typeof decoded === "string") {
      res.status(403).json({ message: "Invalid token format" });
      return;
    }

    req.userId = (decoded as JwtPayload).id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
