"use strict";

const pringleController = require("./controller/pringleController");
const restaurantController = require("./controller/restaurantController");

module.exports = function (app) {
  app.route("/getAllProduct").get(pringleController.getAllProduct),
    app.route("/getProduct").get(pringleController.getProduct),
    app.route("/mockGetAllRecipes").get(restaurantController.mockGetAllRecipes); //working 
  app.route("/searchChildData").get(restaurantController.searchChildData),  //working
    app.route("/searchData").get(restaurantController.searchData); //skip 
  app
    .route("/starLightForRestaurants")  //working
    .get(restaurantController.starLightForRestaurants);
  app.route("/getAllRestaurant").get(restaurantController.getAllRestaurant); //working 
  app
    .route("/getMealNameAndMealCourse") // working 
    .get(restaurantController.getMealNameAndMealCourse);
  app.route("/dishesSortByTags").get(restaurantController.dishesSortByTags);
  app.route("/getRecipesIngredient").get(restaurantController.getRecipesIngredient);
  app.route("/recipeAssociateRestaurant").get(restaurantController.recipeAssociateRestaurant);
  app.route("/getRestaurantId").get(restaurantController.getRestaurantId);
};
