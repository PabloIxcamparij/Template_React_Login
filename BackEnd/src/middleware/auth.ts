import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error("No Autorizado");
    res.status(401).json({ error: error.message });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401).json({ error: "Token no proporcionado" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET no está definido");
    }

    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findById(decoded.id).select('_id name email');

      if (user) {
        req.user = user;

        return next();
      } else {
        res.status(500).json({ error: "Token no válido" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Token no válido" });
  }
};

// JWT includ in baarer
