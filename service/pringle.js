var request = require("request");
const CONSTANT = require("../config/constant");
const axios = require("axios");


var pringleService = {
  get: async (token) => {
    return new Promise(async(res, rej) => {
      try {
        const response = await axios({
          url: CONSTANT.pringle_url,
          method: "get",
          headers: {
            Token: token,
          },
        });
        res(response?.data);
      } catch (error) {
        rej(error);
      }
    });
  },

  get: async (token)=>{
  return new Promise(async(res,rej)=>{
try{
  const response = await axios({
    url: CONSTANT.rest_url,
    method: "get",
    headers: {
      Token: token,
    },
  });
  res(response?.data);
}catch(error){
  rej(error);
              }
  });
},
};

module.exports = pringleService;
function newFunction() {
  return "Token: 0a799973-206a-4d1b-bf1f-1c3b06f845fd";
}

