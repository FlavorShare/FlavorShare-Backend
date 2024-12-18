import mongoose, { Schema } from "mongoose";
import { Ingredient, ingredientSchema } from "./ingredient";

export interface Instruction {
  _id: string;
  step: number;
  description: string;
  ingredients?: String[];
}

export const instructionSchema = new Schema<Instruction>({
  _id: { type: String, required: true },
  step: { type: Number, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String] },
});

mongoose.model<Instruction>("Instruction", instructionSchema);
