var request = require("request");
const CONSTANT = require("../config/constant");
const axios = require("axios");

var pringleService = {
  get: async (token) => {
    return new Promise(async(res, rej) => {
      try {
        const response = await axios({
          url: CONSTANT.pringle_url + "DigitalMenuProduct/GetAllProductByToken",
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

};

module.exports = pringleService;
