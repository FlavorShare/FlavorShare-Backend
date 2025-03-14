import mongoose, { Schema } from "mongoose";
import { Recipe, recipeSchema } from "./recipe/recipe";

export interface User {
  _id: string; // User ID
  email: string; // User Email
  username: string; // Username
  firstName: string; // First Name
  lastName: string; // Last Name
  phone: string; // Phone Number
  dateOfBirth: Date; // Date of Birth
  recipes: [Recipe]; // List of recipe IDs
  following: [User]; // List of accounts the user ID is following
  followers: [User]; // List of accounts following the user ID
  createdAt?: Date; // Date created
  updatedAt?: Date; // Date updated
  profileImageURL?: string; // Profile Image URL S3 storage
  bio?: string; // User Bio
  likedRecipes?: [Recipe]; // List of recipes the user has liked
  mealPlanList?: MealPlanItem[]; // List of meal plan items
}

export interface MealPlanItem {
  _id: string; // Meal Plan Item ID
  recipe: Recipe; // Recipe ID
  servings: number; // Number of servings
}

const mealPlanItemSchema = new Schema({
  _id: { type: String, required: true },
  recipe: { type: recipeSchema, required: true },
  servings: { type: Number, required: true },
});

export const userSchema = new Schema<User>({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  profileImageURL: { type: String },
  bio: { type: String },
  likedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  mealPlanList: { type: [mealPlanItemSchema] },
});

mongoose.model<User>("User", userSchema);
