import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import indexRoutes from "./routes/indexRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import connectDB from "./config/database";
import userRoutes from "./routes/userRoutes";
import { verifyFirebaseToken } from "./middlewares/verifyFirebaseToken";
import { limiter } from "./middlewares/limiter";
import { verifyApiKey } from "./middlewares/verifyApiKey";
import { initializeApp } from "firebase/app";
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Use the API key verification middleware
app.use(express.json());
app.use(limiter);
app.use(verifyApiKey);
app.use(verifyFirebaseToken);

// Route Middleware
app.use("/", indexRoutes);
app.use("/", recipeRoutes);
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
