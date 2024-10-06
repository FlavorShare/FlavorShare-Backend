import { Router } from "express";
import { RecipeController } from "../controllers/recipeController";

const router = Router();
const Controller = new RecipeController();

// GET
router.get("/recipes", Controller.getAllRecipes);
router.get("/recipes/:id", Controller.getRecipeById);
router.get("/cuisinetypes", Controller.getAllCuisineTypes);
router.get("/recipes/user/:id", Controller.getRecipesForUser);

// POST
router.post("/recipes", Controller.createRecipe);

// PUT
router.put("/recipes/:id", Controller.updateRecipe);

// DELETE
router.delete("/recipes/:id", Controller.deleteRecipe);

export default router;
