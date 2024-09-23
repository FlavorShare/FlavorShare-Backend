import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const controller = new UserController();

// GET
router.get("/user/:id", controller.getUserById);

// POST
router.post("/user", controller.register);

// PUT

// DELETE

export default router;
