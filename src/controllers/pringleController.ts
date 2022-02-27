import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    res.json({ message: "Get All Products" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
