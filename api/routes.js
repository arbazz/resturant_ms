"use strict";

const pringleController = require("./controller/pringleController");
const restaurantController = require("./controller/restaurantController");

module.exports = function (app) {
  app.route("/getAllProduct").get(pringleController.getAllProduct),
    app.route("/getProduct").get(pringleController.getProduct),
    app.route("/mockGetAllRecipes").get(restaurantController.mockGetAllRecipes); //working 
  app.route("api/v1/restaurant/homepage/restaurant/search").get(restaurantController.searchChildData),  //working
    app.route("api/v1/restaurant/homepage/search").get(restaurantController.searchData); //skip 
  app
    .route("api/v1/restaurant/star-light")  //working
    .get(restaurantController.starLightForRestaurants);
  app.route("api/v1/restaurant/get/all").get(restaurantController.getAllRestaurant); //working 
  app
    .route("api/v1/restaurant/homepage/restaurant/mealname-subcourses") // working 
    .get(restaurantController.getMealNameAndMealCourse);
  app.route("api/v1/restaurant/homepage/restaurant/tag-dishes").get(restaurantController.dishesSortByTags);
  app.route("api/v1/restaurant/homepage/recipes/").get(restaurantController.getRecipesIngredient); // working 
  app.route("api/v1/restaurant/recipe-associate-restaurant").get(restaurantController.recipeAssociateRestaurant); //working 
  app.route("api/v1/restaurant/get-restaurant").get(restaurantController.getRestaurantId); // not extact result showing this api
};
