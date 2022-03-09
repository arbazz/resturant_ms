"use strict";

const pringleController = require("./controller/pringleController");
const restaurantController = require("./controller/restaurantController");

module.exports = function (app) {
  app.route("/getAllProduct").get(pringleController.getAllProduct),
    app.route("/getProduct").get(pringleController.getProduct),
    app.route("/mockGetAllRecipes").get(restaurantController.mockGetAllRecipes);
  app.route("/searchChildData").get(restaurantController.searchChildData),
    app.route("/searchData").get(restaurantController.searchData);
  app
    .route("/starLightForRestaurants")
    .get(restaurantController.starLightForRestaurants);
  app.route("/getAllRestaurant").get(restaurantController.getAllRestaurant);
  app
    .route("/getMealNameAndMealCourse")
    .get(restaurantController.getMealNameAndMealCourse);
  app.route("/dishesSortByTags").get(restaurantController.dishesSortByTags);
  app.route("/getRecipesIngredient").get(restaurantController.getRecipesIngredient);
  app.route("/recipeAssociateRestaurant").get(restaurantController.recipeAssociateRestaurant);
  app.route("/getRestaurantId").get(restaurantController.getRestaurantId);
};
