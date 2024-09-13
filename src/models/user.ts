export interface User {
  id: string; // User ID
  email: string; // User Email
  username: string; // Username
  firstName: string; // First Name
  lastName: string; // Last Name
  phone: string; // Phone Number
  dateOfBirth: Date; // Date of Birth
  following: [string]; // List of accounts the user ID is following
  followers: [string]; // List of accounts following the user ID
  profileImageURL?: string; // Profile Image URL S3 storage
  bio?: string; // User Bio
  stats?: UserStats; // User Stats
  isCurrentUser?: boolean; // Is the user the current user
}

export interface UserStats {
  followers: number;
  following: number;
  posts: number;
}

import { Schema, model } from "mongoose";

export const userStatsSchema = new Schema<UserStats>({
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  posts: { type: Number, default: 0 },
});

export const userSchema = new Schema<User>({
  id: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  following: { type: [String], required: true },
  followers: { type: [String], required: true },
  profileImageURL: { type: String },
  bio: { type: String },
  stats: { type: userStatsSchema },
  isCurrentUser: {
    type: Boolean,
    default: function () {
      // This function should be replaced with actual logic to determine if the user is the current user
      return false;
    },
  },
});

export const UserModel = model<User>("User", userSchema);

export default UserModel;
