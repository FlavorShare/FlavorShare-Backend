export interface Ingredient {
  name: string;
  quantity: string;
  imageURL?: string;
}

import { Schema, model } from "mongoose";

export const ingredientSchema = new Schema<Ingredient>({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  imageURL: { type: String },
});

export const IngredientModel = model<Ingredient>(
  "Ingredient",
  ingredientSchema
);

export default IngredientModel;
