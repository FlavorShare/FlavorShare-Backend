export interface Ingredient {
  name: string;
  quantity: string;
  img?: string;
}

import { Schema, model } from "mongoose";

export const ingredientSchema = new Schema<Ingredient>({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
});

export const IngredientModel = model<Ingredient>(
  "Ingredient",
  ingredientSchema
);

export default IngredientModel;
