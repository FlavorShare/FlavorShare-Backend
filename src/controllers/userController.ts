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

  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const userRecord = await auth().getUserByEmail(email);
      const token = await auth().createCustomToken(userRecord.uid);

      res.json({ token });
    } catch (err) {
      console.error((err as Error).message);
      res.status(500).send("Server error");
    }
  }

  async getProfile(req: Request & { user: { email: string } }, res: Response) {
    try {
      const user = await UserModel.findOne({ email: req.user.email }).select(
        "-password"
      );

      res.json(user);
    } catch (err) {
      console.error((err as Error).message);

      res.status(500).send("Server error");
    }
  }
}
