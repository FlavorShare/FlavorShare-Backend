import express from "express";
import indexRoutes from "./routes/index";
import recipeRoutes from "./routes/recipe";
import connectDB from "./config/database";

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use("/", indexRoutes);
app.use("/", recipeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
