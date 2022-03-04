const mongoose = require('../db/db');
const Cuisine = require("./cuisines");

let cart = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  res_id: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Array,
    dishId_menuId: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    size: {
      type: String,
    },
    addOns: {
      type: Array,
    },
  },
  createdDate:{
      type:Date,
  },
  updateDate:{
    type:Date,
    
}
});

module.exports = mongoose.model("cart", cart);
