import { Request, Response, NextFunction } from "express";

// Middleware to verify API Key
export function verifyApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"] as string | undefined;
  const apiSecret = req.headers["x-api-secret"] as string | undefined;

  if (
    apiKey &&
    apiKey === process.env.APP_API_Key &&
    apiSecret === process.env.APP_API_Secret
  ) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}
