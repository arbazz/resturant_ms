const fs = require('fs');
var restaurantController ={
mockGetAllRecipes: async(req, res) => {
    try{
   const file = await fs.readFileSync(
        "./config/recipes.json",
        "utf8");
            obj = await JSON.parse(file);
            let arr = [];
            arr = arr.push(obj);
            const returnObj = {
                preparation: obj.preparation,
                cooking: obj.cooking,
            };
            return res.status(200).json({
                status: true,
                returnObj,
            });}
            catch(err){
                return res.status(500).json({
                    status:false,
                    msg: err
                })
            }
        },
        searchData : async (req, res) => {
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
        
               let query1 = {
                if (req.query.type === "restaurant") {
                    $or: [{
                        restaurantName: {
                            $regex: req.query.keyword,
                            $options: "si"
                        }
                    },
                    {
                        dishes: {
                            $elemMatch: {
                                resDishName: {
                                    $regex: req.query.keyword,
                                    $options: "si"
                                },
                            },
                        },
                    },
                ],
            }
               }

               let query2 = {
                if (req.query.type === "restaurant"){
                {
                    restaurantName: 1,
                    restaurantID: 1,
                    "image.imageUrl": 1,
                    _id: 1
                }
                else if (req.query.type === "dish") {
               }}
             else if (req.query.type === "dish") {
                await Recipes.find({
                        dishName: {
                            $elemMatch: {
                                name: {
                                    $regex: req.query.keyword,
                                    $options: "si"
                                }
                            },
                        },
                    }, {
                        "dishName.$": 1,
                        image: 1,
                        _id: 1
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
                await Recipes.find({
                        dishName: {
                            $elemMatch: {
                                name: {
                                    $regex: req.query.keyword,
                                    $options: "si"
                                }
                            },
                        },
                    }, {
                        "dishName.$": 1,
                        image: 1,
                        _id: 1
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
        },
        
        //searchChildData
        searchChildData : async (req, res) => {
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
                        function () {
                            fs.readFile(
                                "./controller/onboarding/prioritizeArr.json",
                                "utf8",
                                function (data) {
                                   try{
                                    obj = await JSON.parse(data);
                                    let arrayData = [];
                                    obj.map((item, index) => {
                                        //arrayData[index] = new ObjectId(item.recipeId);
                                        arrayData[index] = (item.recipeId);
                                        if (obj.length === index + 1) {
                                            return arrayData;
                                        }
                                    });
                                    return  res.status(200).json({
                                        status : true,
                                        arrayData}
                                        );
                                } catch(err) {
                                       new Error(err);
                                    };
                            }
                            );
                        },
                        function async(arrayData) {
                            let findData;
                            let getKey;
                            if (req.query.keyword == "all") {
                                 findData = {
                                    $and: [{
                                            "_id": ObjectId(req.query.resid)
                                        },
                                        {
                                            "restaurant_menu.recipeId": {
                                                $in: arrayData
                                            }
                                        },
                                    ]
                                };
                            } else {
                                findData = {
                                    $and: [{
                                            "_id": ObjectId(req.query.resid)
                                        },
                                        {
                                            "restaurant_menu.recipeId": {
                                                $in: arrayData
                                            }
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
                                [{
                                        $unwind: "$restaurant_menu"
                                    },
                                    {
                                        $match: findData
                                    },
                                    {
        
                                        $project: {
                                            _id: 1,
                                            //restaurantTags: 1,
                                            "image": 1,
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
                                (resultUsersData) => {
                                 try{
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
        
                                            let dishes = await resultUsersData
                                                .filter(
                                                    (data) => req.query.resid.toString() === data._id.toString()
                                                )
                                                .map((d) => d.restaurant_menu);
                                            let removeDup = dishes.reduce((unique, o) => {
                                                if (
                                                    !unique.some(
                                                        (obj) =>
                                                        obj.dish_name === o.dish_name &&
                                                        obj.price === o.price
                                                    )
                                                ) {
                                                    unique.push(o);
                                                }
                                                return unique;
                                            }, []);
        
                                            return res( {
                                                ...returnObj,
                                                dishes: removeDup
                                            });
                                        } else {
                                            return res({
                                                data: null
                                            });
                                        }
        
                                    }catch(err){
                                        new Error(err)
                                    }
                                }
                            );
                        },
                    ],
                    function (data){
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
                        function () {
                            let findData;
                            if (req.query.keyword == "all") {
                                findData = {
                                    "_id": ObjectId(req.query.resid),
                                    "restaurant_menu.dish_name": {
                                        $ne: null
                                    },
                                    "restaurant_menu.price": {
                                        $ne: null
                                    }
                                };
                            } else {
                                findData = {
                                    "_id": ObjectId(req.query.resid),
                                    "restaurant_menu.resDishName": {
                                        $regex: req.query.keyword,
                                        $options: "si",
                                    },
                                };
                            }
        
                            Restaurantdata.aggregate(
                                [{
                                        $unwind: "$restaurant_menu"
                                    },
                                    {
                                        $match: findData
                                    },
                                    {
                                        $project: {
                                            _id: 1,
                                            //restaurantTags: 1,
                                            "image": 1,
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
                                (resultUsersData) => {
                                    try {
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
                                            let dishes = await resultUsersData
                                                .filter(
                                                    (data) => req.query.resid.toString() === data._id.toString()
                                                ).map((d) => d.restaurant_menu);
                                            let removeDup = dishes.reduce((unique, o) => {
        
                                                if (
                                                    !unique.some(
                                                        (obj) =>
                                                        obj.dish_name === o.dish_name &&
                                                        obj.price === o.price
                                                    )
                                                ) {
                                                    unique.push(o);
                                                }
                                                return unique;
                                            }, []);
        
                                             
                                            return res( {
                                                ...returnObj,
                                                dishes: removeDup
                                            });
                                        } else {
                                            return res({
                                                data: null
                                            });
                                        }
                                    }catch(err){
                                        new Error(err);
                                    }
                                }
                            );
                        },
                    ],
                    function (data) {
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
                        function () {
                            let findData;
                            // check when click courses
                            if (
                                req.query.mainCategory == "all" &&
                                req.query.subCategory == "all"
                            ) {
                                if (req.query.keyword == "all") {
                                    findData = {
                                        "_id": ObjectId(req.query.resid),
                                    };
                                } else {
                                    findData = {
                                        "_id": ObjectId(req.query.resid),
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
                                        "_id": ObjectId(req.query.resid),
                                        "restaurant_menu.meal_courses": {
                                            $regex: req.query.mainCategory,
                                            $options: "si",
                                        },
                                    };
                                } else {
                                    findData = {
                                        $and: [{
                                                "_id": ObjectId(req.query.resid)
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
                                        $and: [{
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
                                        $and: [{
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
                                [{
                                        $unwind: "$restaurant_menu"
                                    },
                                    {
                                        $match: findData
                                    },
                                    {
                                        $project: {
                                            _id: 1,
                                            //restaurantTags: 1,
                                            "image": 1,
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
                                (resultUsersData) => {
                                    try {
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
                                            let dishes = await resultUsersData
                                                .filter(
                                                    (data) => req.query.resid.toString() === data._id.toString()
                                                ).map((d) => d.restaurant_menu);
                                            let removeDup = dishes.reduce((unique, o) => {
        
                                                if (
                                                    !unique.some(
                                                        (obj) =>
                                                        obj.dish_name === o.dish_name &&
                                                        obj.price === o.price
                                                    )
                                                ) {
                                                    unique.push(o);
                                                }
                                                return unique;
                                            }, []);
        
                                             
                                            return res( {
                                                ...returnObj,
                                                dishes: removeDup
                                            });
                                        } else {
                                            return res({
                                                data: null
                                            });
                                        }
        
                                    }catch(err){
                                        new Error(err)
                                    }
                                }
                            );
                        },
                    ],
                    function (data) {
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
        }

};
 module.exports= restaurantController;