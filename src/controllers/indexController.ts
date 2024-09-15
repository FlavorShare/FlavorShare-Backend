import { Request, Response } from "express";

export const getIndex = (req: Request, res: Response) => {
  res.send("Connected to the FlavorShare API");
};
