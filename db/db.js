const mongoose = require("mongoose");

// ------------------------------------------- mongodb connection codes-------------------------------------------
// let dbURI = "";  // cloud URI
let dbURI = "mongodb://localhost:27017/matirxRestaurantDB";

mongoose.connect(dbURI, 
{ 
    useUnifiedTopology: true,
    newUrlParser: true,
    useNewUrlParser: true
},
(err)=>{
    if(!err)
    {
        console.log("Database Connected")
    }
    else{
        console.log("Database Not Connected")
    }
}
);
module.exports = mongoose;
