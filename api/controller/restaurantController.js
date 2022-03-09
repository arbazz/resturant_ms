const fs = require("fs");
const { ObjectId } = require("mongodb");
const Restaurantdata = require("../../model/Restaurantdata");
const axios = require("axios").default;
const Recipes = require("../../model/recipes");
const Recipesensory = require("../../model/Recipesensory");
const ingredient = require("../../model/ingredients");
const recipes = require("../../model/recipes");
const async = require("async");
const resturantController = {
  mockGetAllRecipes: async (req, res) => {
    try {
      const file = await fs.readFileSync("./config/recipes.json", "utf8");
      let obj = JSON.parse(file);
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
    } catch (err) {
      new Error(err);
      return res.status(500).json({
        status: false,
        error: err.message,
      });
    }
  },
  searchData: async (req, res) => {
    try {
      if (
        Object.values(req.query).every((page) => page === "") ||
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
      let query1 = {};
      let query2 = {};
      if (req.query.type === "restaurant") {
        query1 = {
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
        };
        query2 = {
          restaurantName: 1,
          restaurantID: 1,
          "image.imageUrl": 1,
          _id: 1,
        };
      } else if (req.query.type === "dish") {
        query1 = {
          dishName: {
            $elemMatch: {
              name: {
                $regex: req.query.keyword,
                $options: "si",
              },
            },
          },
        };
        query2 = {
          "dishName.$": 1,
          image: 1,
          _id: 1,
        };
      } else if (req.query.type === "recipes") {
        query1 = {
          dishName: {
            $elemMatch: {
              name: {
                $regex: req.query.keyword,
                $options: "si",
              },
            },
          },
        };
        query2 = {
          "dishName.$": 1,
          image: 1,
          _id: 1,
        };
      }
      let response = await Recipes.find({ query1, query2 });
      return res.status(200).json({
        status: true,
        response,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        msg: "Something Went Wrong!!!",
        err: err,
      });
    }
  },
  searchChildData: async (req, res) => {
    try {
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
      //  console.log(req.query.type );
      if (req.query.type === "popular") {
        const data = await fs.readFileSync(
          "./config/prioritizeArr.json",
          "utf8"
        );

        let obj = JSON.parse(data);
        let arrayData = [];
        obj.map((item, index) => {
          //arrayData[index] = new ObjectId(item.recipeId);
          arrayData[index] = item.recipeId;
          if (obj.length === index + 1) {
            return arrayData;
          }
        });

        let findData;
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

        let resultUsersData = await Restaurantdata.aggregate([
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
        ]);
        let dataObj;
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
              (data) => req.query.resid.toString() === data._id.toString()
            )
            .map((d) => d.restaurant_menu);
          let removeDup = dishes.reduce((unique, o) => {
            if (
              !unique.some(
                (obj) => obj.dish_name === o.dish_name && obj.price === o.price
              )
            ) {
              unique.push(o);
            }
            return unique;
          }, []);
          dataObj = {
            ...returnObj,
            dishes: removeDup,
          };
        } else {
          dataObj = {
            data: null,
          };
        }

        if (dataObj.data === null) {
          res.status(200).json({
            status: true,
            data: null,
          });
        } else {
          res.status(200).json({
            status: true,
            dat: dataObj.data,
          });
        }
      } else if (req.query.type === "sensory") {
        let findData;
        // check when click courses
        if (req.query.mainCategory == "all" && req.query.subCategory == "all") {
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
        let resultUsersData = await Restaurantdata.aggregate([
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
        ]);
        let dataObj;
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
              (data) => req.query.resid.toString() === data._id.toString()
            )
            .map((d) => d.restaurant_menu);
          let removeDup = dishes.reduce((unique, o) => {
            if (
              !unique.some(
                (obj) => obj.dish_name === o.dish_name && obj.price === o.price
              )
            ) {
              unique.push(o);
            }
            return unique;
          }, []);
          dataObj = {
            ...returnObj,
            dishes: removeDup,
          };
        } else {
          dataObj = {
            data: null,
          };
        }
        if (dataObj.data === null) {
          res.status(200).json({
            status: true,
            data: null,
          });
        } else {
          res.status(200).json({
            status: true,
            data: dataObj.data,
          });
        }
      }
    } catch (error) {
      return res.status(500).send({
        message: "Some Thing went wrong",
        err: error.message,
      });
    }
  },

  dishesSortByTags: async (req, res) => {
    try {
      let url = `https://api.pikky.io/ds/api/v1/server2/getTagDishes?id=${req.query.resid}&tags=${req.query.tag}`;
      try {
        let response = await axios.get(url);
        console.log(response);
        let Restaurantdata = response.data;
        if (Restaurantdata.restaurantDishes.length > 0) {
          Restaurantdata.restaurantDishes.map((item, index) => {
            arrayId[index] = new ObjectId(item.restaurantDishId);
            if (Restaurantdata.restaurantDishes.length == index + 1) {
              // callback(null, arrayId);
              if (arraySearch.length > 0) {
                let resultUsersData = Restaurantdata.aggregate([
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
                ]);
                let dataObj;
                if (resultUsersData) {
                  const returnObj = {
                    restaurantId: resultUsersData[0]._id,
                    restaurantName: resultUsersData[2].restaurantName,
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

                  dataObj = {
                    ...returnObj,
                    dishes: removeDup,
                  };
                }
                dataObj = {
                  data: null,
                };
              } else {
                dataObj = {
                  data: null,
                };
              }
              if (dataObj.data === null) {
                res.status(200).json({
                  status: true,
                  data: null,
                });
              } else {
                res.status(200).json({
                  status: true,
                  data: dataObj.data,
                });
              }
            }
          });
        }
      } catch (error) {
        return res.status(500).send({
          message: "Some Thing went wrong",
          err: error.message,
        });
      }
    } catch (error) {
      return res.status(500).send({
        message: "Some Thing went wrong",
        err: error.message,
      });
    }
  },
  starLightForRestaurants: async (req, res) => {
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
      try {
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

        const data = await Promise.all(promiseResult);
        return res.status(200).json({
          status: true,
          data,
        });
      } catch (err) {
        return res.status(500).json({
          status: false,
          msg: "Something went wrong!!!",
        });
      }
    } else if (type === "sensory") {
      try {
        const data = await Recipesensory.find(
          {
            recipeId: dishid,
          },
          {
            sensoryProfile: 1,
          }
        );
        return res.status(200).json({
          status: true,
          data,
        });
      } catch (err) {
        return res.status(500).json({
          status: false,
          msg: "Something went wrong!!!",
        });
      }
    } else if (type === "nutritional") {
      try {
        const data = await Recipesensory.find(
          {
            recipeId: dishid,
          },
          {
            nutritionalValue: 1,
            calories: 1,
          }
        );
        return res.status(200).json({
          status: true,
          data,
        });
      } catch (err) {
        return res.status(500).json({
          status: false,
          msg: "Something went wrong!!!",
        });
      }
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

      try {
        const data = await Promise.all(promiseResult);
        return res.status(200).json({
          status: true,
          data,
        });
      } catch (err) {
        return res.status(500).json({
          status: false,
          msg: "Something went wrong!!!",
        });
      }
    }
  },
  getAllRestaurant: async (req, res) => {
    try {
      const data = await Restaurantdata.find().select({
        restaurantName: 1,
        image: 1,
      });
      return res.status(200).json({
        status: true,
        data,
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Something Went Wrong!!!",
      });
    }
  },
  getMealNameAndMealCourse: async (req, res) => {
    try {
      const { resid } = req.query;
      const result = await Restaurantdata.findById(
        {
          _id: ObjectId(resid),
        },
        {
          "dishes.mealName": 1,
          "dishes.subCourse": 1,
        }
      );
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
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Something Went Wrong!!!",
      });
    }
  },
};

module.exports = resturantController;