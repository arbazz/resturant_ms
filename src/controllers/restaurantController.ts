import { Request, Response } from "express";

export const getCart = async (req: Request, res: Response) => {
  try {
    res.json({ message: "Get Cart" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const createCart = async (req: Request, res: Response) => {
  try {
    res.json({ message: "Create Cart" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const createCartItems = async (req: Request, res: Response) => {
  try {
    res.json({ message: "Create Cart Items" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateCartItemsQuantity = async (req: Request, res: Response) => {
  try {
    res.json({ message: "Update Cart Items Quantity" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
