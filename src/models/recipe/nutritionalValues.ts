import mongoose, { Schema } from "mongoose";

export interface NutritionalValues {
  calories: number; // Calories
  protein: number; // Protein in grams
  fat: number; // Fat in grams
  carbohydrates: number; // Carbohydrates in grams
}

export const nutritionalValuesSchema = new Schema<NutritionalValues>({
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
});

mongoose.model<NutritionalValues>("NutritionalValues", nutritionalValuesSchema);
