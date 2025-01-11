import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const controller = new UserController();

// GET
router.get("/user/:id", controller.getUserById);
router.get("/users", controller.getAllUsers);
router.get("/user/:id/mealPlanItems", controller.getMealPlanItems);

// POST
router.post("/user", controller.createNewUser);

// PUT
router.put("/user/:id", controller.updateUserById);

// DELETE
router.delete("/user/:id", controller.deleteUserById);

export default router;
