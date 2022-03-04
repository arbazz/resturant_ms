const mongoose = require('../db/db');



let LocationSchema = new mongoose.Schema({
    continent : String,
    sub_continent : String,
    country : String,
    region : String,
    state : String,
})

module.exports = mongoose.model("locations", LocationSchema)