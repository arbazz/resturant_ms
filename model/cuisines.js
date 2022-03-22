const mongoose = require('mongoose')



let CuisineSchema = new mongoose.Schema({
    name : {
        type : Array,
        required : "Required"
    },
    alternative_name : {
        type : String,
        required : "Required"
    },
    image: {
        type : Array,
        default:[]
    },
    child:{
        type : Array,
        default:[]
    },
    parent:{
        type : Array,
        default:[]
    },
    status :  {
        type:String,
        default:'draft'
    },
    national :  {
        type:String,
    },
    createById:{
        type:String,
    },
    createDate:{
        type:Date,
    },
    updateDate:{
        type:Date,
    }
})

module.exports = mongoose.model("cuisine", CuisineSchema)