const axios = require("axios");
const async = require("async");
const Recipes = require("../model/recipes");
const Restaurantdata = require("../model/Restaurantdata");
const Recipesensory = require("../model/Recipesensory");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const ingredient = require("../model/ingredients");
const recipes = require("../model/recipes");
//mock get recipes
exports.mockGetAllRecipes = async (req, res) => {
  fs.readFile(
    "./controller/onboarding/recipes.json",
    "utf8",
    function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      let arr = [];
      arr = arr.push(obj);
      const returnObj = {
        preparation: obj.preparation,
        cooking: obj.cooking,
      };
      return res.status(200).json({
        status: true,
        returnObj,
      });
    }
  );
};

exports.searchData = async (req, res) => {
  // if true then req.query is empty
  if (
    Object.values(req.query).every((page) => page === "") ||
    // typeof req.query.dishid != "string" ||
    (Object.keys(req.query).length === 0) === true ||
    req.query.type === "" ||
    req.query.keyword === ""
  ) {
    //return boolean
    return res.status(400).json({
      status: false,
      msg: "Bad Input",
    });
  }

  if (req.query.type === "restaurant") {
    await Restaurantdata.find(
      {
        $or: [
          {
            restaurantName: {
              $regex: req.query.keyword,
              $options: "si",
            },
          },
          {
            dishes: {
              $elemMatch: {
                resDishName: {
                  $regex: req.query.keyword,
                  $options: "si",
                },
              },
            },
          },
        ],
      },
      {
        restaurantName: 1,
        restaurantID: 1,
        "image.imageUrl": 1,
        _id: 1,
      },
      (err, resultUsersData) => {
        if (err) {
          res.status(500).json({
            status: false,
            msg: "Something Went Wrong!!!",
            err: err,
          });
        } else {
          res.status(200).json({
            status: true,
            resultUsersData,
          });
        }
      }
    );
  } else if (req.query.type === "dish") {
    await Recipes.find(
      {
        dishName: {
          $elemMatch: {
            name: {
              $regex: req.query.keyword,
              $options: "si",
            },
          },
        },
      },
      {
        "dishName.$": 1,
        image: 1,
        _id: 1,
      },
      (err, resultUsersData) => {
        if (err) {
          res.status(500).json({
            status: false,
            msg: "Something Went Wrong!!!",
            err: err,
          });
        } else {
          res.status(200).json({
            status: true,
            resultUsersData,
          });
        }
      }
    );
  } else if (req.query.type === "recipes") {
    await Recipes.find(
      {
        dishName: {
          $elemMatch: {
            name: {
              $regex: req.query.keyword,
              $options: "si",
            },
          },
        },
      },
      {
        "dishName.$": 1,
        image: 1,
        _id: 1,
      },
      (err, resultUsersData) => {
        if (err) {
          res.status(500).json({
            status: false,
            msg: "Something Went Wrong!!!",
            err: err,
          });
        } else {
          res.status(200).json({
            status: true,
            resultUsersData,
          });
        }
      }
    );
  }
};

//searchChildData
exports.searchChildData = async (req, res) => {
  // if true then req.query is empty

  if (
    Object.values(req.query).every((page) => page === "") ||
    (Object.keys(req.query).length === 0) === true ||
    req.query.type === "" ||
    req.query.keyword === "" ||
    req.query.resid === ""
  ) {
    //return boolean
    return res.status(400).json({
      status: false,
      msg: "Bad Input",
    });
  }

  if (req.query.type === "popular") {
    async.waterfall(
      [
        function (callback) {
          fs.readFile(
            "./controller/onboarding/prioritizeArr.json",
            "utf8",
            function (err, data) {
              if (err) throw err;
              obj = JSON.parse(data);
              let arrayData = [];
              obj.map((item, index) => {
                //arrayData[index] = new ObjectId(item.recipeId);
                arrayData[index] = item.recipeId;
                if (obj.length === index + 1) {
                  return arrayData;
                }
              });
              callback(null, arrayData);
            }
          );
        },
        function (arrayData, callback) {
          let findData;
          let getKey;
          if (req.query.keyword == "all") {
            findData = {
              $and: [
                {
                  _id: ObjectId(req.query.resid),
                },
                {
                  "restaurant_menu.recipeId": {
                    $in: arrayData,
                  },
                },
              ],
            };
          } else {
            findData = {
              $and: [
                {
                  _id: ObjectId(req.query.resid),
                },
                {
                  "restaurant_menu.recipeId": {
                    $in: arrayData,
                  },
                },
                {
                  "restaurant_menu.dish_name": {
                    $regex: req.query.keyword,
                    $options: "si",
                  },
                },
              ],
            };
          }
          Restaurantdata.aggregate(
            [
              {
                $unwind: "$restaurant_menu",
              },
              {
                $match: findData,
              },
              {
                $project: {
                  _id: 1,
                  //restaurantTags: 1,
                  image: 1,
                  restaurantName: 1,
                  //cuisineServed: 1,
                  pricing_details: 1,
                  contact_details: 1,
                  "restaurant_menu.meal_courses": 1,
                  "restaurant_menu.typeOfMenu": 1,
                  "restaurant_menu.dish_name": 1,
                  //"restaurant_menu.resDishUrl": 1,
                  "restaurant_menu.price": 1,
                  //"restaurant_menu.dishSubstitute": 1,
                  //"restaurant_menu.dishOptions": 1,
                  //"restaurant_menu.dishSize": 1,
                  //"restaurant_menu.dishAddOn": 1,
                  "restaurant_menu.image": 1,
                },
              },
            ],
            (err, resultUsersData) => {
              if (err) {
                callback(err, null);
              } else {
                if (resultUsersData.length > 0) {
                  const returnObj = {
                    restaurantId: resultUsersData[0]._id,
                    restaurantImg: resultUsersData[0].image,
                    restaurantName: resultUsersData[0].restaurantName,
                    //restaurantCuisine: resultUsersData[0].cuisineServed,
                    restaurantPricing: resultUsersData[0].pricing_details,
                    restaurantAddress: resultUsersData[0].contact_details,
                    //restaurantTags: resultUsersData[0].restaurantTags,
                  };

                  let dishes = resultUsersData
                    .filter(
                      (data) =>
                        req.query.resid.toString() === data._id.toString()
                    )
                    .map((d) => d.restaurant_menu);
                  let removeDup = dishes.reduce((unique, o) => {
                    if (
                      !unique.some(
                        (obj) =>
                          obj.dish_name === o.dish_name && obj.price === o.price
                      )
                    ) {
                      unique.push(o);
                    }
                    return unique;
                  }, []);

                  callback(null, {
                    ...returnObj,
                    dishes: removeDup,
                  });
                } else {
                  callback(null, {
                    data: null,
                  });
                }
              }
            }
          );
        },
      ],
      function (err, data) {
        if (data.data === null) {
          res.status(200).json({
            status: true,
            data: null,
          });
        } else {
          res.status(200).json({
            status: true,
            data,
          });
        }
      }
    );
  } else if (req.query.type === "sensory") {
    async.waterfall(
      [
        function (callback) {
          let findData;
          if (req.query.keyword == "all") {
            findData = {
              _id: ObjectId(req.query.resid),
              "restaurant_menu.dish_name": {
                $ne: null,
              },
              "restaurant_menu.price": {
                $ne: null,
              },
            };
          } else {
            findData = {
              _id: ObjectId(req.query.resid),
              "restaurant_menu.resDishName": {
                $regex: req.query.keyword,
                $options: "si",
              },
            };
          }

          Restaurantdata.aggregate(
            [
              {
                $unwind: "$restaurant_menu",
              },
              {
                $match: findData,
              },
              {
                $project: {
                  _id: 1,
                  //restaurantTags: 1,
                  image: 1,
                  restaurantName: 1,
                  //cuisineServed: 1,
                  pricing_details: 1,
                  contact_details: 1,
                  "restaurant_menu.meal_courses": 1,
                  "restaurant_menu.typeOfMenu": 1,
                  "restaurant_menu.dish_name": 1,
                  //"restaurant_menu.resDishUrl": 1,
                  "restaurant_menu.price": 1,
                  //"restaurant_menu.dishSubstitute": 1,
                  //"restaurant_menu.dishOptions": 1,
                  //"restaurant_menu.dishSize": 1,
                  //"restaurant_menu.dishAddOn": 1,
                  "restaurant_menu.image": 1,
                },
              },
            ],
            (err, resultUsersData) => {
              if (err) {
                callback(err, null);
              } else {
                if (resultUsersData.length > 0) {
                  const returnObj = {
                    restaurantId: resultUsersData[0]._id,
                    restaurantImg: resultUsersData[0].image,
                    restaurantName: resultUsersData[0].restaurantName,
                    //restaurantCuisine: resultUsersData[0].cuisineServed,
                    restaurantPricing: resultUsersData[0].pricing_details,
                    restaurantAddress: resultUsersData[0].contact_details,
                    //restaurantTags: resultUsersData[0].restaurantTags,
                  };
                  let dishes = resultUsersData
                    .filter(
                      (data) =>
                        req.query.resid.toString() === data._id.toString()
                    )
                    .map((d) => d.restaurant_menu);
                  let removeDup = dishes.reduce((unique, o) => {
                    if (
                      !unique.some(
                        (obj) =>
                          obj.dish_name === o.dish_name && obj.price === o.price
                      )
                    ) {
                      unique.push(o);
                    }
                    return unique;
                  }, []);

                  callback(null, {
                    ...returnObj,
                    dishes: removeDup,
                  });
                } else {
                  callback(null, {
                    data: null,
                  });
                }
              }
            }
          );
        },
      ],
      function (err, data) {
        if (data.data === null) {
          res.status(200).json({
            status: true,
            data: null,
          });
        } else {
          res.status(200).json({
            status: true,
            data,
          });
        }
      }
    );
  } else if (req.query.type === "courses") {
    async.waterfall(
      [
        function (callback) {
          let findData;
          // check when click courses
          if (
            req.query.mainCategory == "all" &&
            req.query.subCategory == "all"
          ) {
            if (req.query.keyword == "all") {
              findData = {
                _id: ObjectId(req.query.resid),
              };
            } else {
              findData = {
                _id: ObjectId(req.query.resid),
                "restaurant_menu.dish_name": {
                  $regex: req.query.keyword,
                  $options: "si",
                },
              };
            }
          } else if (
            req.query.mainCategory != "all" &&
            req.query.subCategory == "all"
          ) {
            if (req.query.keyword == "all") {
              findData = {
                _id: ObjectId(req.query.resid),
                "restaurant_menu.meal_courses": {
                  $regex: req.query.mainCategory,
                  $options: "si",
                },
              };
            } else {
              findData = {
                $and: [
                  {
                    _id: ObjectId(req.query.resid),
                  },
                  {
                    "restaurant_menu.meal_courses": {
                      $regex: req.query.mainCategory,
                      $options: "si",
                    },
                  },
                  {
                    "restaurant_menu.dish_name": {
                      $regex: req.query.keyword,
                      $options: "si",
                    },
                  },
                ],
              };
            }
          } else if (
            req.query.mainCategory != "all" &&
            req.query.subCategory != "all"
          ) {
            // check when click courses and click parent category Breakfast, lunch, bunch dinner and click sub category like drinks staters etc
            if (req.query.keyword == "all") {
              findData = {
                $and: [
                  {
                    "restaurant_menu.meal_courses": {
                      $regex: req.query.mainCategory,
                      $options: "si",
                    },
                  },
                  {
                    "restaurant_menu.typeOfMenu": {
                      $regex: req.query.subCategory,
                      $options: "si",
                    },
                  },
                ],
              };
            } else {
              findData = {
                $and: [
                  {
                    "restaurant_menu.meal_courses": {
                      $regex: req.query.mainCategory,
                      $options: "si",
                    },
                  },
                  {
                    "restaurant_menu.typeOfMenu": {
                      $regex: req.query.subCategory,
                      $options: "si",
                    },
                  },
                  {
                    "restaurant_menu.dish_name": {
                      $regex: req.query.keyword,
                      $options: "si",
                    },
                  },
                ],
              };
            }
          } // else end

          if (req.query.keyword == "all") {
            keyWordSerch = {};
          } else {
            keyWordSerch = {
              restaurant_menu: {
                $elemMatch: {
                  dish_name: {
                    $regex: req.query.keyword,
                    $options: "si",
                  },
                },
              },
            };
          }
          Restaurantdata.aggregate(
            [
              {
                $unwind: "$restaurant_menu",
              },
              {
                $match: findData,
              },
              {
                $project: {
                  _id: 1,
                  //restaurantTags: 1,
                  image: 1,
                  restaurantName: 1,
                  //cuisineServed: 1,
                  pricing_details: 1,
                  contact_details: 1,
                  "restaurant_menu.meal_courses": 1,
                  "restaurant_menu.typeOfMenu": 1,
                  "restaurant_menu.dish_name": 1,
                  //"restaurant_menu.resDishUrl": 1,
                  "restaurant_menu.price": 1,
                  //"restaurant_menu.dishSubstitute": 1,
                  //"restaurant_menu.dishOptions": 1,
                  //"restaurant_menu.dishSize": 1,
                  //"restaurant_menu.dishAddOn": 1,
                  "restaurant_menu.image": 1,
                },
              },
            ],
            (err, resultUsersData) => {
              if (err) {
                callback(err, null);
              } else {
                if (resultUsersData.length > 0) {
                  const returnObj = {
                    restaurantId: resultUsersData[0]._id,
                    restaurantImg: resultUsersData[0].image,
                    restaurantName: resultUsersData[0].restaurantName,
                    //restaurantCuisine: resultUsersData[0].cuisineServed,
                    restaurantPricing: resultUsersData[0].pricing_details,
                    restaurantAddress: resultUsersData[0].contact_details,
                    //restaurantTags: resultUsersData[0].restaurantTags,
                  };
                  let dishes = resultUsersData
                    .filter(
                      (data) =>
                        req.query.resid.toString() === data._id.toString()
                    )
                    .map((d) => d.restaurant_menu);
                  let removeDup = dishes.reduce((unique, o) => {
                    if (
                      !unique.some(
                        (obj) =>
                          obj.dish_name === o.dish_name && obj.price === o.price
                      )
                    ) {
                      unique.push(o);
                    }
                    return unique;
                  }, []);

                  callback(null, {
                    ...returnObj,
                    dishes: removeDup,
                  });
                } else {
                  callback(null, {
                    data: null,
                  });
                }
              }
            }
          );
        },
      ],
      function (err, data) {
        // const returnData = result.filter((data) => {
        // 	return req.query.resid === data._id.toString();
        // });
        res.status(200).json({
          status: true,
          data,
        });
      }
    );
  }
};

//get single view of recipes ingredient
exports.getRecipesIngredient = async (req, res) => {
  // if true then req.query is empty
  if (
    Object.values(req.query).every((page) => page === "") ||
    typeof req.query.dishid != "string" ||
    (Object.keys(req.query).length === 0) === true ||
    req.query.dishid === ""
  ) {
    //return boolean
    return res.status(400).json({
      status: false,
      msg: "Bad Input",
    });
  }
  async.waterfall(
    [
      function (callback) {
        Recipes.find(
          {
            _id: req.query.dishid,
          },
          {
            ingredients: 1,
            dishName: 1,
            _id: 1,
            "image.imageUrl": 1,
          },
          (err, callbackChild) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, callbackChild);
            }
          }
        );
      },
      function (ingredientIdData, callback) {
        let arrayIngredientId = [];
        ingredientIdData[0].ingredients.map((item, index, array) => {
          let y = JSON.parse(JSON.stringify(item));
          if (y.ingredientId != "" || y.ingredientId == undefined) {
            ingredient.findById(
              y.ingredientId,
              {
                ingredient_name: 1,
              },
              (err, result) => {
                if (err) {
                  callback(err, null);
                } else {
                  if (result.ingredient_name.length > 0) {
                    y.name = result.ingredient_name[0].name;
                  } else {
                    y.name = "";
                  }
                }
                arrayIngredientId.push(y);
                if (ingredientIdData[0].ingredients.length == index + 1) {
                  arrayIngredientId.push({
                    dishImgUrl: ingredientIdData[0].image,
                    dishName: ingredientIdData[0].dishName,
                    dishId: ingredientIdData[0]._id,
                  });

                  callback(null, arrayIngredientId);
                }
              }
            );
          }
        });
      },
    ],
    function (err, data) {
      res.status(200).json({
        status: true,
        data,
      });
    }
  );
};

exports.starLightForRestaurants = async (req, res) => {
  // if true then req.query is empty
  if (
    Object.values(req.query).every((page) => page === "") ||
    typeof req.query.dishid != "string" ||
    (Object.keys(req.query).length === 0) === true ||
    req.query.type === "" ||
    req.query.dishid === ""
  ) {
    //return boolean
    return res.status(400).json({
      status: false,
      msg: "Bad Input",
    });
  }

  const { dishid, type } = req.query;

  if (type === "similar") {
    const apiData = await axios.get(
      `https://api.pikky.io/ds/api/v1/server2/start-light/restaurant`,
      {
        params: {
          dishid: dishid,
        },
      }
    );

    const dishData = apiData.data;

    if (dishData.dishes.length === 0) {
      return res.status(200).json({
        status: true,
        msg: "Restaurants not available",
      });
    }

    const promiseResult = dishData.dishes.map(async (data) => {
      const getDishData = await Recipes.findById({
        _id: ObjectId(data.recipeId),
      }).select({
        "image.imageUrl": 1,
        dishName: 1,
      });
      const returnObj = {
        dishid: data.recipeId,
        dishImg: getDishData.image.imageUrl,
        dishName: getDishData.dishName,
      };

      return returnObj;
    });

    Promise.all(promiseResult)
      .then((data) => {
        return res.status(200).json({
          status: true,
          data,
        });
      })
      .catch(() => {
        return res.status(500).json({
          status: false,
          msg: "Something went wrong!!!",
        });
      });
  } else if (type === "sensory") {
    await Recipesensory.find(
      {
        recipeId: dishid,
      },
      {
        sensoryProfile: 1,
      }
    )
      .then((data) => {
        return res.status(200).json({
          status: true,
          data,
        });
      })
      .catch(() => {
        return res.status(500).json({
          status: false,
          msg: "Something went wrong!!!",
        });
      });
  } else if (type === "nutritional") {
    await Recipesensory.find(
      {
        recipeId: dishid,
      },
      {
        nutritionalValue: 1,
        calories: 1,
      }
    )
      .then((data) => {
        return res.status(200).json({
          status: true,
          data,
        });
      })
      .catch(() => {
        return res.status(500).json({
          status: false,
          msg: "Something went wrong!!!",
        });
      });
  } else if (type === "restaurant") {
    const restData = await Restaurantdata.aggregate([
      {
        $unwind: "$dishes",
      },
      {
        $match: {
          "dishes.recipeId": ObjectId(dishid),
        },
      },
      {
        $project: {
          "image.imageUrl": 1,
          _id: 1,
          restaurantName: 1,
          "dishes._id": 1,
          "dishes.recipeId": 1,
          "dishes.resDishName": 1,
          "dishes.dishPrice": 1,
        },
      },
    ]);
    let promiseResult = restData.map((d) => {
      const returnObj = {
        dishid: d.recipeId,
        restaurantId: d._id,
        restaurantImg: d.image,
        dishName: d.dishes.resDishName,
        dishPrice: d.dishes.dishPrice,
        restaurantName: d.restaurantName,
      };
      return returnObj;
    });

    Promise.all(promiseResult)
      .then((data) => {
        return res.status(200).json({
          status: true,
          data,
        });
      })
      .catch(() => {
        return res.status(500).json({
          status: false,
          msg: "Something went wrong!!!",
        });
      });
  }
};

//getting all the restaurant data
exports.getAllRestaurant = async (req, res) => {
  await Restaurantdata.find()
    .select({
      restaurantName: 1,
      image: 1,
    })
    .then((data) => {
      return res.status(200).json({
        status: true,
        data,
      });
    })
    .catch(() => {
      return res.status(500).json({
        status: false,
        msg: "Something Went Wrong!!!",
      });
    });
};

//get the mealName and mealCourse of a particular restaurant
exports.getMealNameAndMealCourse = async (req, res) => {
  const { resid } = req.query;
  await Restaurantdata.findById(
    {
      _id: ObjectId(resid),
    },
    {
      "dishes.mealName": 1,
      "dishes.subCourse": 1,
    }
  )
    .then((result) => {
      function removeDuplicatesBy(keyFn, array) {
        let mySet = new Set();
        return array.filter(function (x) {
          let key = keyFn(x),
            isNew = !mySet.has(key);
          if (isNew) mySet.add(key);
          return isNew;
        });
      }

      let data = result.dishes.reduce((unique, o) => {
        if (
          !unique.some(
            (obj) =>
              obj.mealName === o.mealName && obj.subCourse === o.subCourse
          )
        ) {
          unique.push(o);
        }
        return unique;
      }, []);

      // let mealName = [];
      // let subCourse = [];

      // removeDuplicatesBy((x) => x.mealName, removeDup).map((d) => {
      // 	mealName.push(d.mealName);
      // });

      // removeDuplicatesBy((x) => x.subCourse, removeDup).map((d) => {
      // 	subCourse.push(d.subCourse);
      // });
      // let data = { mealName: mealName, subCourse: subCourse };
      return res.status(200).json({
        status: true,
        data,
      });
    })
    .catch(() => {
      return res.status(500).json({
        status: false,
        msg: "Something Went Wrong!!!",
      });
    });
};

//filter dishes according to the tags
exports.dishesSortByTags = async (req, res) => {
  async.waterfall(
    [
      function (callback) {
        let url = `https://api.pikky.io/ds/api/v1/server2/getTagDishes?id=${req.query.resid}&tags=${req.query.tag}`;
        axios
          .get(url)
          .then(function (response) {
            callback(null, response.data);
          })
          .catch(function (error) {
            callback(error, null);
          });
      },
      function (Restaurantdata, callback) {
        let arrayId = [];
        if (Restaurantdata.restaurantDishes.length > 0) {
          Restaurantdata.restaurantDishes.map((item, index) => {
            arrayId[index] = new ObjectId(item.restaurantDishId);
            if (Restaurantdata.restaurantDishes.length == index + 1) {
              callback(null, arrayId);
            }
          });
        } else {
          callback(null, []);
        }
      },
      function (arraySearch, callback) {
        if (arraySearch.length > 0) {
          Restaurantdata.aggregate(
            [
              {
                $unwind: "$restaurant_menu",
              },
              {
                $match: {
                  "restaurant_menu._id": {
                    $in: arraySearch,
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  restaurantName: 1,
                  restaurant_menu: 1,
                },
              },
            ],
            (err, resultUsersData) => {
              if (err) {
                callback(err, null);
              } else {
                // callback(null, resultUsersData);
                const returnObj = {
                  restaurantId: resultUsersData[0]._id,
                  restaurantName: resultUsersData[2].restaurantName,
                };

                let dishes = resultUsersData
                  .filter(
                    (data) => req.query.resid.toString() === data._id.toString()
                  )
                  .map((d) => d.restaurant_menu);
                let removeDup = dishes.reduce((unique, o) => {
                  if (
                    !unique.some(
                      (obj) =>
                        obj.dish_name === o.dish_name && obj.price === o.price
                    )
                  ) {
                    unique.push(o);
                  }
                  return unique;
                }, []);

                callback(null, {
                  ...returnObj,
                  dishes: removeDup,
                });
              }
            }
          );
        } else {
          callback(null, {
            data: null,
          });
        }
      },
    ],
    function (err, data) {
      if (err) {
        return res.status(500).json({
          status: false,
          msg: "Something went wrong!!!",
          err: err,
        });
      } else {
        if (data.data === null) {
          return res.status(200).json({
            status: true,
            data: null,
          });
        } else {
          return res.status(200).json({
            status: true,
            data,
          });
        }
      }
    }
  );
};

exports.getRestaurantId = async (req, res) => {
  try {
    if (req.query.id == undefined || req.query.id == "") {
      return res.json({
        status: "false",
        error: "Invalid Search Id",
      });
    } else {
      async.waterfall(
        [
          function (callback) {
            Restaurantdata.findById(
              ObjectId(req.query.id),
              (err, resultRestaurant) => {
                if (err) {
                  callback(err, null);
                } else {
                  callback(null, resultRestaurant);
                }
              }
            );
          },
          function (data, callback) {
            if (data != null) {
              if (data.restaurant_menu.length > 0) {
                let recipeData = [];
                data.restaurant_menu.forEach((item) => {
                  recipeData = [...recipeData, ...item.recipesAssociate];
                });
                let searchObject = recipeData.map((item, index) => {
                  return ObjectId(item);
                });
                recipes.find(
                  {
                    _id: {
                      $in: searchObject,
                    },
                  },
                  {
                    _id: 1,
                    dishName: 1,
                    image: 1,
                  },
                  (err, resultRecipes) => {
                    if (err) {
                      callback(null, [], [], false);
                    } else {
                      callback(null, data, resultRecipes, true);
                    }
                  }
                );
              } else {
                callback(null, data, [], false);
              }
            } else {
              callback(null, [], [], false);
            }
          },
          function (data, recipeData, status, callback) {
            if (status === false) {
              callback(null, data);
            } else {
              data.restaurant_menu.map((itemMenu, indexMenu) => {
                if (itemMenu.recipesAssociate.length > 0) {
                  let newItem = [];
                  let newObject = itemMenu.recipesAssociate.map(
                    (item, index) => {
                      let objectIndex = recipeData.findIndex(
                        (x) => x._id == item
                      );
                      newItem.push(recipeData[objectIndex]);
                      if (itemMenu.recipesAssociate.length == index + 1) {
                        return newItem[0];
                      }
                    }
                  ); //Inner end
                  delete itemMenu.recipesAssociate;
                  itemMenu.recipesAssociate = newObject;
                }
                if (data.restaurant_menu.length == indexMenu + 1) {
                  callback(null, data);
                }
              });
            }
          },
        ],
        (err, resultRestaurant) => {
          if (err) {
            return res.json({
              status: "false",
              error: err,
            });
          } else {
            return res.json({
              status: "true",
              data: resultRestaurant,
            });
          }
        }
      );
    }
  } catch (error) {
    return res.json({
      status: "false",
      error: error,
    });
  }
};

exports.imageUpload = async (req, res) => {
  try {
    const imageUrl = req.files.map((item) => {
      return item.location;
    });
    res.json({
      status: "true",
      data: imageUrl,
    });
  } catch (error) {
    res.json({
      status: "false",
      error: error,
    });
  }
};
exports.recipeAssociateRestaurant = async (req, res) => {
  try {
    async.waterfall(
      [
        function (callback) {
          if (req.query.dishId == undefined || req.query.dishId == "") {
            callback(error, "invalid dish id");
          } else {
            Restaurantdata.find(
              {
                restaurant_menu: {
                  $elemMatch: {
                    recipesAssociate: {
                      $in: [req.query.dishId],
                    },
                  },
                },
              },
              {
                _id: 1,
                restaurantName: 1,
                image: 1,
                restaurant_logo: 1,
                "restaurant_menu.price.$": 1,
              }
            )
              .then((data) => {
                callback(null, data);
              })
              .catch((error) => {
                callback(error, null);
              });
          }
        },
      ],
      function (error, data) {
        if (error) {
          return res.status(500).json({
            status: false,
            msg: "Something went wrong!!!",
            error: error,
          });
        } else {
          return res.status(200).json({
            status: true,
            data: data,
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Something went wrong!!!",
      error: error,
    });
  }
};
