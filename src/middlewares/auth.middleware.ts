import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

dotenv.config();

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appAPIKey = process.env.API_KEY;
    if (!appAPIKey) throw new Error("API key not configured");

    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const clientKey = authHeader.split(" ")[1];

    // Securely compare API keys in a timing-attack-resistant way
    const keyBuffer = Buffer.from(clientKey);
    const apiBuffer = Buffer.from(appAPIKey);
    if (
      keyBuffer.length !== apiBuffer.length ||
      !crypto.timingSafeEqual(keyBuffer, apiBuffer)
    ) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
