import { Schema } from "mongoose";

export interface Instruction {
  step: number;
  description: string;
}

export const instructionSchema = new Schema<Instruction>({
  step: { type: Number, required: true },
  description: { type: String, required: true },
});
