import { Request, Response } from "express";
import UserModel from "../models/user"; // Adjust the path as necessary

export class UserController {
  /// -----------------------------------------
  /// -------------- GET REQUEST --------------
  /// -----------------------------------------

  async getUserById(req: Request, res: Response) {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user data", error });
    }
  }

  /// ------------------------------------------
  /// -------------- POST REQUEST --------------
  /// ------------------------------------------

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

  /// -----------------------------------------
  /// -------------- PUT REQUEST --------------
  /// -----------------------------------------

  /// --------------------------------------------
  /// -------------- DELETE REQUEST --------------
  /// --------------------------------------------

  /// ---------------------------------------------
  /// -------------- OTHER FUNCTIONS --------------
  /// ---------------------------------------------

  /// ----------------------------------------------
  /// -------------- UNUSED FUNCTIONS --------------
  /// ----------------------------------------------
}
