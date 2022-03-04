const mongoose = require('../db/db');


let RecipeSupportSchema = new mongoose.Schema({
    value : {
        type : String,
        lowercase : true,
        trim: true
    },
    category : {
        type : String,
        lowercase : true
    },
})

module.exports = mongoose.model("recipesupport", RecipeSupportSchema)