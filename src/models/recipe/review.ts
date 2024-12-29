import mongoose, { Schema } from "mongoose";
import { User } from "../user";

export interface Review {
  ownerId: string; // User ID
  rating: number; // Rating
  comment: string; // Comment
  createdAt: Date; // Date created
  updatedAt: Date; // Date updated
}

export const reviewSchema = new Schema<Review>({
  ownerId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

mongoose.model<Review>("Review", reviewSchema);
