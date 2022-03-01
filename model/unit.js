const mongoose = require('../db/db');



let UnitSchema = new mongoose.Schema({
    unit : String,
})

module.exports = mongoose.model("units", UnitSchema)