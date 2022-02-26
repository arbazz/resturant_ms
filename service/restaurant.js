var request = require("request");
const CONSTANT = require("../config/constant");
const axios = require("axios");

const restaurantService = {
  getDigitalMenu: async (token) => {
    return new Promise(async (res, rej) => {
      try {
        const response = await axios({
          url: CONSTANT.API + "digitalmenucart",
          method: "get",
          headers: {
            Token: token,
          },
        });
        console.log(response);
        res(response?.data);
      } catch (error) {
        console.log(error);
        rej(error);
      }
    });
  },

  getDigitalCartItem: async (token) => {
    return new Promise(async (res, rej) => {
      try {
        const response = await axios({
          url: CONSTANT.digitalmenucartitem_Url,
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
  updateCartItem: async (token) => {
    return new Promise(async (res, rej) => {
      try {
        const response = await axios({
          url: CONSTANT.updateCartMenuItemQuantity_Url,
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
  createCart: async (token) => {
    return new Promise(async (res, rej) => {
      try {
        const response = await axios({
          url: CONSTANT.API + "digitalmenucart",
          method: "post",
          headers: {
            Token: token,
          },
          data: {
            
          }
        });
        console.log(response);
        res(response?.data);
      } catch (error) {
        rej(error);
      }
    });
  },
};

module.exports = restaurantService;
function newFunction() {
  return "Token: 0a799973-206a-4d1b-bf1f-1c3b06f845fd";
}
