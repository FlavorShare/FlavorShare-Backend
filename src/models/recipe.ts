import { CuisineType } from "./cuisineType";
import { Ingredient } from "./ingredient";

export interface Recipe {
  title: string; // Recipe Title
  createdBy: string; // User ID
  cuisineType: CuisineType; // Cuisine Type
  ingredients: Ingredient[]; // Ingredients list
  instructions: string[]; // Instructions list
  prepTime: number; // Cooking time in minutes
  servings: number; // Number of servings
  createdAt?: Date; // Date created
  updatedAt?: Date; // Date updated
  img?: string; // Image URL for S3 storage
}

import { Schema, model } from "mongoose";
import { ingredientSchema } from "./ingredient";

const recipeSchema = new Schema<Recipe>({
  title: { type: String, required: true },
  createdBy: { type: String, required: true },
  cuisineType: {
    type: String,
    enum: Object.values(CuisineType),
    required: true,
  },
  ingredients: { type: [ingredientSchema], required: true },
  instructions: { type: [String], required: true },
  prepTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const RecipeModel = model<Recipe>("Recipe", recipeSchema);

export default RecipeModel;
