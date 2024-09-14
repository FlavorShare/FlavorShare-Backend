import { Router } from "express";
import { UserController } from "../controllers/userController";
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
const controller = new UserController();

// POST
router.post("/register", controller.register);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  controller.login
);

// GET
import { Request, Response } from "express";

router.get("/profile", authMiddleware, async (req: Request, res: Response) => {
  await controller.getProfile(
    req as Request & { user: { email: string } },
    res
  );
});

export default router;
