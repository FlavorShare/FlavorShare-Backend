import mongoose, { Schema } from "mongoose";
import { Ingredient } from "./ingredient";

export interface Instruction {
  step: number;
  description: string;
  ingredients: Ingredient[];
}

export const instructionSchema = new Schema<Instruction>({
  step: { type: Number, required: true },
  description: { type: String, required: true },
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true,
  }],
});

mongoose.model<Instruction>("Instruction", instructionSchema);