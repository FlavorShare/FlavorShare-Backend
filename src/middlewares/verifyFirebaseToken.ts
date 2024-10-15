import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

interface CustomRequest extends Request {
  user?: admin.auth.DecodedIdToken;
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

    // Check if the user still exists in Firebase Auth
    const userRecord = await admin.auth().getUser(decodedToken.uid);
    if (!userRecord) {
      console.log("User does not exist");
      return res.status(401).json({ message: "User does not exist" });
    }

    req.user = decodedToken;
    console.log("Token verified and user exists");
    next();
  } catch (error) {
    console.log("Invalid token or user does not exist");
    console.log(idToken);
    console.log(error);
    return res
      .status(401)
      .json({ message: "Invalid token or user does not exist", error });
  }
}
