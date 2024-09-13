export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
  profileImageURL?: string;
  bio?: string;
  isFollowed?: boolean;
  stats?: UserStats;
  isCurrentUser?: boolean;
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
  profileImageURL: { type: String },
  bio: { type: String },
  isFollowed: { type: Boolean, default: false },
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
