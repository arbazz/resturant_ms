import { Router } from "express";
import { getAllProducts } from "./../controllers/pringleController";
import {
  getCart,
  createCart,
  createCartItems,
  updateCartItemsQuantity,
} from "./../controllers/restaurantController";

const router = Router();

router.get("/getAllProduct/:token", getAllProducts);
router.get("/digitalMenuCartItem", getCart);
router.post("/digitalMenuCart", createCart);
router.post("/digitalMenuCartItem", createCartItems);
router.put("/digitalMenuCartItem/:id", updateCartItemsQuantity);

export default router;
