"use strict";

const pringleController = require("./controllers/pringleController");
const restaurantController =require("./controllers/restaurantController");

module.exports = function (app) {
  app.route("/getAllProduct").get(pringleController.getAllProduct),
  app.route("/getProduct").get(pringleController.getProduct),
  app.route("/mockGetAllRecipes").get(restaurantController.mockGetAllRecipes);
};
