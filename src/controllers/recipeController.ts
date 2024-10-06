import { Request, Response } from "express";
import RecipeModel from "../models/recipe/recipe";
import { CuisineType } from "../models/recipe/cuisineType";
import UserModel from "../models/user";

export class RecipeController {
  /// -----------------------------------------
  /// -------------- GET REQUEST --------------
  /// -----------------------------------------

  getAllRecipes = async (req: Request, res: Response) => {
    try {
      const recipes = await RecipeModel.find();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recipes", error });
    }
  };

  getRecipeById = async (req: Request, res: Response) => {
    try {
      const recipe = await RecipeModel.findById(req.params.id);
      if (!recipe) {
        res.status(404).json({ message: "Recipe not found" });
      } else {
        res.status(200).json(recipe);
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching recipe", error });
    }
  };

  getAllCuisineTypes = async (req: Request, res: Response) => {
    try {
      const types = Object.values(CuisineType);
      res.status(200).json(types);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recipe types", error });
    }
  };

  getRecipesForUser = async (req: Request, res: Response) => {
    try {
      // Find the user by ID
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Extract recipe IDs from the user object
      const recipeIds = user.recipes;

      // Fetch the recipes using the extracted recipe IDs
      const recipes = await RecipeModel.find({ _id: { $in: recipeIds } });

      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recipes", error });
    }
  };

  /// ------------------------------------------
  /// -------------- POST REQUEST --------------
  /// ------------------------------------------

  createRecipe = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      const {
        title,
        imageURL,
        ownerId,
        description,
        ingredients,
        instructions,
        cookTime,
        servings,
        likes,
        type,
        nutritionalValues,
      } = req.body;
      const newRecipe = new RecipeModel({
        title,
        imageURL,
        ownerId,
        createdAt: new Date(),
        updatedAt: new Date(),
        description,
        ingredients,
        instructions,
        cookTime,
        servings,
        likes,
        type,
        nutritionalValues,
      });
      const savedRecipe = await newRecipe.save();

      // Find the user by ownerId
      const user = await UserModel.findById(ownerId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update the user's recipeIds array
      user.recipes.push(savedRecipe._id.toString());
      await user.save();

      console.log(savedRecipe);
      res.status(201).json(savedRecipe);
    } catch (error) {
      res.status(500).json({ message: "Error creating recipe", error });
      console.log(error);
    }
  };

  /// -----------------------------------------
  /// -------------- PUT REQUEST --------------
  /// -----------------------------------------

  updateRecipe = async (req: Request, res: Response) => {
    try {
      const updatedRecipe = await RecipeModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          updatedAt: new Date(),
        },
        { new: true }
      );
      if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.status(200).json(updatedRecipe);
    } catch (error) {
      res.status(500).json({ message: "Error updating recipe", error });
    }
  };

  /// --------------------------------------------
  /// -------------- DELETE REQUEST --------------
  /// --------------------------------------------

  deleteRecipe = async (req: Request, res: Response) => {
    try {
      const deletedRecipe = await RecipeModel.findByIdAndDelete(req.params.id);
      if (!deletedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting recipe", error });
    }
  };

  /// ---------------------------------------------
  /// -------------- OTHER FUNCTIONS --------------
  /// ---------------------------------------------

  /// ----------------------------------------------
  /// -------------- UNUSED FUNCTIONS --------------
  /// ----------------------------------------------

  // Get all recipes by a specific user
  //   getRecipesByUser = async (req: Request, res: Response) => {
  //     try {
  //       const recipes = await RecipeModel.find({ ownerId: req.params.userId });
  //       res.status(200).json(recipes);
  //     } catch (error) {
  //       res.status(500).json({ message: "Error fetching recipes", error });
  //     }
  //   };

  // Get all recipes by a specific type (cuisine type)
  //   getRecipesByType = async (req: Request, res: Response) => {
  //     try {
  //       const recipes = await RecipeModel.find({ type: req.params.type });
  //       res.status(200).json(recipes);
  //     } catch (error) {
  //       res.status(500).json({ message: "Error fetching recipes", error });
  //     }
  //   };
}
