import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const controller = new UserController();

// GET
router.get("/user/:id", controller.getUserById);
router.get("/user/:id/mealPlanItems", controller.getMealPlanItems);

// POST
router.post("/user", controller.createNewUser);

// PUT
router.put("/user/:id", controller.updateUserById);

// DELETE
router.post("/user/:id", controller.deleteUserById);

export default router;
