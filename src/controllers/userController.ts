import { Console } from "console";
import { Request, Response } from "express";
import mongoose from "mongoose";

const UserModel = mongoose.model("User");

export class UserController {
  /// -----------------------------------------
  /// -------------- GET REQUEST --------------
  /// -----------------------------------------

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      let query;

      // Check if the userId is a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(userId)) {
        query = { _id: new mongoose.Types.ObjectId(userId) };
      } else {
        query = { _id: userId };
      }

      const user = await UserModel.findOne(query);
      if (!user) {
        console.log("User not found");
        res.status(404).json({ message: "User not found" });
      } else {
        console.log("User found");
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching user data", error });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users", error });
    }
  }

  async getMealPlanItems(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      let query;

      // Check if the userId is a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(userId)) {
        query = { _id: new mongoose.Types.ObjectId(userId) };
      } else {
        query = { _id: userId };
      }

      const user = await UserModel.findOne(query);
      if (!user) {
        console.log("User not found");
        res.status(404).json({ message: "User not found" });
      } else {
        console.log("User found");
        res.status(200).json(user.mealPlanItems);
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching meal plan items", error });
    }
  }

  /// ------------------------------------------
  /// -------------- POST REQUEST --------------
  /// ------------------------------------------

  async createNewUser(req: Request, res: Response) {
    console.log("Creating new user");
    console.log(req.body);
    const { _id, email, username, firstName, lastName, phone, dateOfBirth } =
      req.body;

    try {
      const user = new UserModel({
        _id: _id,
        email,
        username,
        firstName,
        lastName,
        phone,
        dateOfBirth,
        following: [],
        followers: [],
        profileImageURL: "",
        bio: "",
        stats: { followers: 0, following: 0, posts: 0 },
        isCurrentUser: false,
      });
      console.log(user);
      await user.save();
      console.log("User saved successfully");
      res.status(201).json({ uid: user._id });
    } catch (err) {
      console.error((err as Error).message);
      res.status(500).send("Server error");
    }
  }

  /// -----------------------------------------
  /// -------------- PUT REQUEST --------------
  /// -----------------------------------------

  async updateUserById(req: Request, res: Response) {
    try {
      console.log("Updating user");
      console.log(req.body);

      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          updatedAt: new Date(),
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user", error });
    }
  }

  /// --------------------------------------------
  /// -------------- DELETE REQUEST --------------
  /// --------------------------------------------

  async deleteUserById(req: Request, res: Response) {
    console.log("Deleting user");
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log(`User ${req.params.id} deleted successfully`);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  }

  /// ---------------------------------------------
  /// -------------- OTHER FUNCTIONS --------------
  /// ---------------------------------------------

  /// ----------------------------------------------
  /// -------------- UNUSED FUNCTIONS --------------
  /// ----------------------------------------------
}
