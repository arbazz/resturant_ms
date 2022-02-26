"use strict";
const restaurantService = require("../../service/restaurant");

var restaurantController = {
  getCart: async (req, res) => {
    try {
      const token = req.get("Token");
      // if (!token) {
      //   return res.status(200).json({
      //     error: "Token is required",
      //   });
      // }
      const response = await restaurantService.getDigitalMenu(
        "0a799973-206a-4d1b-bf1f-1c3b06f845fd"
      );
      res.json({ response });
    } catch (err) {
      console.log(err.message);
      res.json(err.message);
    }
  },
  createCard: async (req, res) => {
    try {
      const token = req.get("Token");
      const response = await restaurantService.createCart(token);
      res.json({ response });
    } catch (error) {
      console.log(error);
      res.json(error.message);
    }
  },
  createCartItems: async (req, res) => {
    try {
    } catch (error) {}
  },
  updateCartItemQuantity: async (req, res) => {
    try {
    } catch (error) {}
  },
};

module.exports = restaurantController;
