export interface Recipe {
  title: string;
  cuisineType: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  createdAt?: Date;
  updatedAt?: Date;
}

import { Schema, model } from "mongoose";

const recipeSchema = new Schema<Recipe>({
  title: { type: String, required: true },
  cuisineType: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const RecipeModel = model<Recipe>("Recipe", recipeSchema);

export default RecipeModel;
