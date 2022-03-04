const User = require("../../model/User");
const recipesSensory = require("../../model/Recipesensory");
const recipes = require("../../model/recipes");
const axios = require("axios");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const async = require('async')

exports.recipesSensorySearchById = async (req, res) => {
    try {
        async.waterfall([
            function(callback){
                if(req.params.recipe_id==undefined) {
                    callback("Invalid recipes id", null)
                } else {
                    recipesSensory.findOne({recipeId:req.params.recipe_id}).then(result=>{
                         callback(null, result)
                    }).catch(error=>{
                        callback(error, null)
                    })
                }
            }
        ], (err, result)=>{
            if(err) {
             return res.json({status:401, message:err})
            } else {
                return res.json({status:200, message:result})
            }
        })
    } catch(error) {
        return res.json({status:401, message:error})
    }
	
};

exports.recipesById = async (req, res) => {
    try {
        async.waterfall([
            function(callback){
                if(req.params.recipe_id==undefined) {
                    callback("Invalid recipes id", null)
                } else {
                    recipes.findOne({_id:ObjectId(req.params.recipe_id)}).then(result=>{
                        callback(null, result)
                    }).catch(error=>{
                        callback(error, null)
                    })
                }
            }
        ], (err, result)=>{
            if(err) {
                return res.json({status:401, message:err})
            } else {
                return res.json({status:200, message:result})
            }
        })
    } catch(error) {
        return res.json({status:401, message:error})
    }

};
