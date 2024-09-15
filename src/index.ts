import express from "express";
import indexRoutes from "./routes/indexRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import connectDB from "./config/database";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Route Middleware
app.use(express.json());
app.use("/", indexRoutes);
app.use("/", recipeRoutes);
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
