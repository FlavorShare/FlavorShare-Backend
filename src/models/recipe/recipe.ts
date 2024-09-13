// src/models/recipe.ts
import { Schema, model } from "mongoose";

import { CuisineType } from "./cuisineType";
import { Ingredient, ingredientSchema } from "./ingredient";
import { Instruction, instructionSchema } from "./instruction";
import {
  NutritionalValues,
  nutritionalValuesSchema,
} from "./nutritionalValues";
import { User, userSchema } from "../user";

export interface Recipe {
  title: string; // Recipe Title
  imageURL: string; // Image URL S3 Storage
  ownerId: string; // User ID

  createdAt: Date; // Date created
  updatedAt: Date; // Date updated

  description: string; // Recipe Description
  ingredients: Ingredient[]; // Ingredients list
  instructions: Instruction[]; // Instructions list
  cookTime: number; // Cooking time in minutes
  servings: number; // Number of servings

  likes: number; // Number of likes
  type: CuisineType; // Cuisine Type
  nutritionalValue?: NutritionalValues; // Nutritional Values
  user?: User; // User object found based on User ID
}

const recipeSchema = new Schema<Recipe>({
  title: { type: String, required: true },
  imageURL: { type: String, required: true },
  ownerId: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  description: { type: String, required: true },
  ingredients: { type: [ingredientSchema], required: true },
  instructions: { type: [instructionSchema], required: true },
  cookTime: { type: Number, required: true },
  servings: { type: Number, required: true },

  likes: { type: Number, required: true },
  type: { type: String, enum: Object.values(CuisineType), required: true },
  nutritionalValue: { type: nutritionalValuesSchema },
  user: { type: userSchema },
});

const RecipeModel = model<Recipe>("Recipe", recipeSchema);

export default RecipeModel;
