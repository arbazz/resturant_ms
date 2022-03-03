const fs = require("fs");

const resturantController = {
  mockGetAllRecipes: async (req, res) => {
    try {
      const file = await fs.readFileSync(
        "./controller/onboarding/recipes.json",
        "utf8"
      );
      let obj = JSON.parse(data);
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
    let query = {};
    if (req.query.type === "restaurant") {
      (query = {
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
      }),
        {
          restaurantName: 1,
          restaurantID: 1,
          "image.imageUrl": 1,
          _id: 1,
        };
    } else if (req.query.type === "dish") {
      query = {
        dishName: {
          $elemMatch: {
            name: {
              $regex: req.query.keyword,
              $options: "si",
            },
          },
        },
      };
    }
  },
};
