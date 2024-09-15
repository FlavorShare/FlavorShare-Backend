import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const controller = new UserController();

// GET
router.get("/users/:id", controller.getUserById);

// POST
router.post("/register", controller.register);

// PUT

// DELETE

export default router;
