export interface User {
  _id: string; // User ID
  email: string; // User Email
  username: string; // Username
  firstName: string; // First Name
  lastName: string; // Last Name
  phone: string; // Phone Number
  dateOfBirth: Date; // Date of Birth
  recipes: [string]; // List of recipe IDs
  following: [string]; // List of accounts the user ID is following
  followers: [string]; // List of accounts following the user ID
  createdAt?: Date; // Date created
  updatedAt?: Date; // Date updated
  profileImageURL?: string; // Profile Image URL S3 storage
  bio?: string; // User Bio
}

import { Schema, model } from "mongoose";

export const userSchema = new Schema<User>({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  recipes: { type: [String], required: true },
  following: { type: [String], required: true },
  followers: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  profileImageURL: { type: String },
  bio: { type: String },
});

export const UserModel = model<User>("User", userSchema);

export default UserModel;
