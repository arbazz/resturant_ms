const mongoose = require('../db/db');

let IngredientSupportSchema = new mongoose.Schema({
    value : {
        type : String,
        lowercase : true,
        trim: true
    },
    type : String,
    section : String
})

module.exports = mongoose.model("ingredientsupport", IngredientSupportSchema)