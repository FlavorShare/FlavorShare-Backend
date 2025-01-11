import { Request, Response } from "express";
import { CuisineType } from "../models/recipe/cuisineType";
import mongoose from "mongoose";
import "../models/user";
import "../models/recipe/recipe";
import { Recipe } from "../models/recipe/recipe";
import "../models/foodItem"; // Ensure this path is correct
import { Ingredient } from "../models/recipe/ingredient";

const UserModel = mongoose.model("User");
const RecipeModel = mongoose.model("Recipe");
const FoodItemModel = mongoose.model("FoodItem");

export class RecipeController {
  /// -----------------------------------------
  /// -------------- GET REQUEST --------------
  /// -----------------------------------------

  getAllRecipes = async (req: Request, res: Response) => {
    try {
      // Fetch all recipes based on createdAt date newest to oldest
      const recipes = await RecipeModel.find().sort({ createdAt: -1 });
      console.log(recipes);
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
      const recipes = await RecipeModel.find({ _id: { $in: recipeIds } }).sort({
        createdAt: -1,
      });

      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recipes", error });
    }
  };

  getRecipeByIds = async (req: Request, res: Response) => {
    console.log("GET RECIPE BY IDS");
    // Get Recipe Id list
    console.log(req.body);
    let recipeIds = req.body;
    let recipes: Recipe[] = [];

    try {
      // for each ids find the recipe and add it to the recipes list
      for (const id of recipeIds) {
        const recipe = await RecipeModel.findById(id);
        if (recipe) {
          recipes.push(recipe);
        }
      }

      console.log(recipes);

      res.status(200).json(recipes);
    } catch (error) {
      console.log(error);

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

      this.addMissingFoodItems(ingredients);

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
    console.log("updateRecipe called");
    console.log(req.body);

    this.addMissingFoodItems(req.body.ingredients);

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
        console.log("Recipe not found");
        return res.status(404).json({ message: "Recipe not found" });
      }
      console.log(updatedRecipe);
      res.status(200).json(updatedRecipe);
    } catch (error) {
      console.log("Error updating recipe: ", error);
      res.status(500).json({ message: "Error updating recipe", error });
    }
  };

  /// --------------------------------------------
  /// -------------- DELETE REQUEST --------------
  /// --------------------------------------------

  deleteRecipe = async (req: Request, res: Response) => {
    try {
      const deletedRecipe = await RecipeModel.findByIdAndDelete(req.params.id);

      // Find the user by ownerId
      const user = await UserModel.findById(deletedRecipe.ownerId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove the recipe ID from the user's recipes array
      user.recipes = user.recipes.filter((recipeId: any) => {
        return recipeId.toString() !== deletedRecipe._id.toString();
      });
      await user.save();

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

  addMissingFoodItems = async (ingredients: [Ingredient]) => {
    // Look for the ingredient names in the FoodItem database
    // if doesn't match an existing FoodItem, add the FoodItem
    // saved under category: Custom
    const ingredientNames = ingredients.map((ingredient: any) => {
      return ingredient.name;
    });
    const foodItems = await FoodItemModel.find({
      name: { $in: ingredientNames },
    });
    const existingFoodItemNames = foodItems.map((foodItem: any) => {
      return foodItem.name;
    });
    const missingFoodItemNames = ingredientNames.filter((name: any) => {
      return !existingFoodItemNames.includes(name);
    });
    for (const name of missingFoodItemNames) {
      const newFoodItem = {
        name,
        category: "Custom",
      };
      await FoodItemModel.create(newFoodItem);
    }
  };

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
