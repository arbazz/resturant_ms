const mongoose = require("../db/db");

const cartSchema = new mongoose.Schema({
  CustomerID: {
    type: String,
  },
  IpAddress: {
    type: String,
  },
  CartStatusID: {
    type: ["Active", "Pending Payment", "Paid", "Void", "Settled", "Other"],
  },
  Token: {
    type: String,
  },
  TotalCost: {
    type: Number,
  },
  CreatedBy: {
    type: Date,
    default: Date.now,
  },
  SessionID: {
    type: String,
  },
  SalesTax: {
    type: String,
  },
  DeliveryFee: {
    type: Number,
  },
  Tip: {
    type: Number,
  },
  PaymentSource: {
    type: Number,
  },
  CashPayment: {
    type: Number,
  },
  TaxExempt: {
    type: Boolean,
  },
  DeliveryInstructions: {
    type: String,
  },
  OrderSource: {
    type: String,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
