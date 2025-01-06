import { Router } from "express";
import { FoodItemController } from "../controllers/foodItemController";

const router = Router();
const Controller = new FoodItemController();

// GET
router.get("/foodItems", Controller.getAllFoodItems);
router.get("/foodItems/:id", Controller.getFoodItemById);

// POST
router.post("/foodItem", Controller.createFoodItem);
router.post("/foodItems", Controller.createFoodItems);

export default router;