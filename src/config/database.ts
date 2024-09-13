import mongoose, { ConnectOptions } from "mongoose";

let dbUri = "mongodb://localhost:27017/flavorshare";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, {
    } as ConnectOptions);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

export default connectDB;
