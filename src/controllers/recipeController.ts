import { Request, Response } from "express";
import RecipeModel from "../models/recipe/recipe";
import { CuisineType } from "../models/recipe/cuisineType";

export class RecipeController {
  // Create a new recipe
  createRecipe = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      const {
        // id,
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
        // _id: id,
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
      console.log(savedRecipe);
      res.status(201).json(savedRecipe);
    } catch (error) {
      res.status(500).json({ message: "Error creating recipe", error });
      console.log(error);
    }
  };

  // Get all recipes
  getAllRecipes = async (req: Request, res: Response) => {
    try {
      const recipes = await RecipeModel.find();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recipes", error });
    }
  };

  // Get a single recipe by ID
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

  // Get all recipes by a specific user
//   getRecipesByUser = async (req: Request, res: Response) => {
//     try {
//       const recipes = await RecipeModel.find({ ownerId: req.params.userId });
//       res.status(200).json(recipes);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching recipes", error });
//     }
//   };

  // Get all recipe types (cuisine types)
  getAllCuisineTypes = async (req: Request, res: Response) => {
    try {
      const types = Object.values(CuisineType);
      res.status(200).json(types);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recipe types", error });
    }
  };

  // Get all recipes by a specific type (cuisine type)
//   getRecipesByType = async (req: Request, res: Response) => {
//     try {
//       const recipes = await RecipeModel.find({ type: req.params.type });
//       res.status(200).json(recipes);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching recipes", error });
//     }
//   };

  // Update a recipe by ID
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

  // Delete a recipe by ID
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
}
