import mongoose, { Schema } from "mongoose";
import { Ingredient, ingredientSchema } from "./ingredient";

export interface Instruction {
  step: number;
  description: string;
  ingredients?: String[];
}

export const instructionSchema = new Schema<Instruction>({
  step: { type: Number, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String] },
});

mongoose.model<Instruction>("Instruction", instructionSchema);
