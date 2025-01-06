import mongoose, { Schema } from "mongoose";

export interface FoodItem {
  _id: string; // Add _id as a string
  name: string;
  category: string;
  allergens?: string[];
  imageURL?: string;
}

export const foodItemSchema = new Schema<FoodItem>({
  _id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  name: { type: String, required: true },
  category: { type: String, required: true },
  allergens: { type: [String] },
  imageURL: { type: String },
});

mongoose.model<FoodItem>("FoodItem", foodItemSchema);
