import { Request, Response } from "express";
import mongoose from "mongoose";
import "../models/foodItem"; // Ensure this path is correct

const FoodItemModel = mongoose.model("FoodItem");

export class FoodItemController {
  /// -----------------------------------------
  /// -------------- GET REQUEST --------------
  /// -----------------------------------------
  getAllFoodItems = async (req: Request, res: Response) => {
    try {
      const foodItems = await FoodItemModel.find();
      res.status(200).json(foodItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching food items", error });
    }
  };

  getFoodItemById = async (req: Request, res: Response) => {
    try {
      const foodItem = await FoodItemModel.findById(req.params.id);
      if (!foodItem) {
        res.status(404).json({ message: "Food item not found" });
      } else {
        res.status(200).json(foodItem);
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching food item", error });
    }
  };

  /// ------------------------------------------
  /// -------------- POST REQUEST --------------
  /// ------------------------------------------
  createFoodItem = async (req: Request, res: Response) => {
    try {
      // Make sure the item doesn't already exist
      const existingItem = await FoodItemModel.findOne({ name: req.body.name });
      if (existingItem) {
        return res.status(400).json({ message: "Food item already exists" });
      }

      const foodItem = await FoodItemModel.create(req.body);
      res.status(201).json(foodItem);
    } catch (error) {
      res.status(500).json({ message: "Error creating food item", error });
    }
  };

  // add list of food items to the database
  createFoodItems = async (req: Request, res: Response) => {
    console.log("createFoodItems");
    console.log(req.body);

    try {
      const body = req.body;
      if (!body) {
        return res.status(400).json({ message: "Request body is missing" });
      }

      // Array to hold created food items
      const createdFoodItems = [];

      // Create new foodItem for each item in the list then add to the database
      for (let i = 0; i < body.length; i++) {
        const newFoodItem = body[i];

        // Make sure the item doesn't already exist
        const existingItem = await FoodItemModel.findOne({
          name: { $regex: new RegExp(newFoodItem.name, "i") },
          category: { $regex: new RegExp(newFoodItem.category, "i") },
        });

        // If exists, skip to the next item
        if (existingItem) {
          continue;
        }

        // Create the new food item
        const foodItem = await FoodItemModel.create(newFoodItem);
        createdFoodItems.push(foodItem);
      }

      res.status(201).json(createdFoodItems);
    } catch (error) {
      res.status(500).json({ message: "Error creating food items", error });
    }
  };
}
