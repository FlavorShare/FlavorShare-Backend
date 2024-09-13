import { CuisineType } from "./cuisineType";
import { Ingredient } from "./ingredient";
import { User } from "./user";

export interface Recipe {
  title: string;
  createdBy: User;
  cuisineType: CuisineType;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  createdAt?: Date;
  updatedAt?: Date;
  img?: string;
}

import { Schema, model } from "mongoose";
import { ingredientSchema } from "./ingredient";
import { userSchema } from "./user";

const recipeSchema = new Schema<Recipe>({
  title: { type: String, required: true },
  createdBy: { type: userSchema, required: true },
  cuisineType: {
    type: String,
    enum: Object.values(CuisineType),
    required: true,
  },
  ingredients: { type: [ingredientSchema], required: true },
  instructions: { type: [String], required: true },
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const RecipeModel = model<Recipe>("Recipe", recipeSchema);

export default RecipeModel;
