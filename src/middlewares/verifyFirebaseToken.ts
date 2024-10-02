import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

interface CustomRequest extends Request {
  user?: any;
}

// Initialize Firebase Admin SDK
export async function verifyFirebaseToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  console.log("verifyFirebaseToken");
  const idToken = req.headers["authorization"]?.split(" ")[1];

  if (!idToken) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log(decodedToken);

    req.user = decodedToken;
    console.log("Token verified");
    next();
  } catch (error) {
    console.log("Invalid token");
    console.log(idToken);
    console.log(error);
    return res.status(401).json({ message: "Invalid token", error });
  }
}
