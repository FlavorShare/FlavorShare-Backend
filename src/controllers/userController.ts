import { Request, Response } from "express";
import { validationResult } from "express-validator";
import UserModel from "../models/user"; // Adjust the path as necessary
import { auth } from "firebase-admin";

export class UserController {
  async register(req: Request, res: Response) {
    const { id, email, username, firstName, lastName, phone, dateOfBirth } =
      req.body;

    try {
      const user = new UserModel({
        _id: id,
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

  async getUserById(req: Request, res: Response) {
    try {
      const user = await UserModel.findById(req.params.id);
      console.log(user);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user data", error });
    }
  }
}
