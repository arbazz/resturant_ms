const mongoose = require("../db/db");

const cartItemSchema = new mongoose.Schema({
  CartID: {
    type: String,
  },
  MenuItemID: {
    type: String,
  },
  MenuSubItemID: {
    type: String,
  },
  Quantity: {
    type: Number,
  },
  UnitCost: {
    type: String,
  },
  SpecialInstructions: {
    type: String,
  },
  CreatedBy: {
    type: String,
  },
  GuestName: {
    type: String,
  },
  ParentCartItemID: {
    type: String,
  },
  TaxExempt: {
    type: Boolean,
  },
  MenuItemVariantID: {
    type: String,
  },
});

module.exports = mongoose.model("CartItems", cartItemSchema);
