import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Database URL for MongoDB
let username = process.env.MONGODB_USERNAME;
let password = process.env.MONGODB_PASSWORD;
let cluster = process.env.MONGODB_CLUSTER;
let appName = process.env.MONGODB_APP_NAME;

let dbUri = `mongodb+srv://${username}:${password}@${cluster}.wingl.mongodb.net/?retryWrites=true&w=majority&appName=${appName}`;

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, {} as ConnectOptions);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

export default connectDB;
