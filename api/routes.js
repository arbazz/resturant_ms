"use strict";

const pringleController = require("./controller/pringleController");
const restaurantController =require("./controller/restaurantController");

module.exports = function (app) {
  app.route("/getAllProduct").get(pringleController.getAllProduct),
  app.route("/getProduct").get(pringleController.getProduct),
  app.route("/mockGetAllRecipes").get(restaurantController.mockGetAllRecipes);
  app.route("/searchChildData").get(restaurantController.searchChildData),
  app.route("/searchData").get(restaurantController.searchData);
 
};
