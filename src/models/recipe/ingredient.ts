import mongoose, { Schema, model } from "mongoose";

export interface Ingredient {
  name: string;
  quantity?: number;
  unit?: string;
  imageURL?: string;
}

export const ingredientSchema = new Schema<Ingredient>({
  name: { type: String, required: true },
  quantity: { type: Number },
  unit: { type: String },
  imageURL: { type: String },
});

mongoose.model<Ingredient>("Ingredient", ingredientSchema);
