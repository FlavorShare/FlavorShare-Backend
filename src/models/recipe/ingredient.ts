export interface Ingredient {
  name: string;
  quantity: number;
  imageURL?: string;
}

import { Schema, model } from "mongoose";

export const ingredientSchema = new Schema<Ingredient>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  imageURL: { type: String },
});

export const IngredientModel = model<Ingredient>(
  "Ingredient",
  ingredientSchema
);

export default IngredientModel;
