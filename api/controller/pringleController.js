"use strict";
const pringleService = require("../../service/pringle");

var pringleController = {
  getAllProduct: async (req, res) => {
    try {
      const token = req.get("Token");
      if (!token) {
        return  res.status(200).json({
          error: "Token is required"
        });
      }
      const response = await pringleService.get(token);
      res.json({ response });
    } catch (err) {
      console.log(err)
      res.json(err);
    }
  },
  getProduct: async (req,res)=>{
    try{
      const token = req.get("Token");
      if(!token){
            return res.status(200).json({
             access: token
            });
      }

      const response = await pringleService.get(token);
      res.json({ response });
    }catch (err){
      console.log(err)
      res.json(err);
    }
  },
};

module.exports = pringleController;
