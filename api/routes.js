"use strict";

const restaurantController = require("./controller/restaurantController");
const pringleController = require("./controller/pringleController");

module.exports = function (app) {
  app.route("/api/digitalmenucart").post(restaurantController.createCard);
  app
    .route("api/digitalmenucartitem")
    .post(restaurantController.createCartItems);
  app
    .route(`/api/DigitalMenuCartItem`)
    .put(restaurantController.updateCartItemQuantity);
  app.route(`/api/DigitalMenuCartItem`).get(restaurantController.getCart);
  app.route(`/api/getAllProduct`).get(pringleController.getAllProduct);
};
