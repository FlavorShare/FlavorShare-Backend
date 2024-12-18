import mongoose, { Schema, model } from "mongoose";

export interface Ingredient {
  _id: string; // Add _id as a string
  name: string;
  quantity?: number;
  unit?: string;
  imageURL?: string;
}

export const ingredientSchema = new Schema<Ingredient>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number },
  unit: { type: String },
  imageURL: { type: String },
});

mongoose.model<Ingredient>("Ingredient", ingredientSchema);
