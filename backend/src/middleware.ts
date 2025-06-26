import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const JWT_KEY = process.env.JWT_SECRET_KEY;
declare module "express" {
  export interface Request {
    userId?: string;
  }
}

export const useMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(401).json({ Message: "Token missing.." });
      return;
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET as string);

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
