const mongoose = require('../db/db');



let TagsSchema = new mongoose.Schema({
    tagType : String,
    value : {
        type : String,
        lowercase : true,
        trim: true
    }
})

module.exports = mongoose.model("tags", TagsSchema)