const mongoose = require('../db/db');

let Restaurantdata = new mongoose.Schema({
	restaurantName: {
		type: String,
	},

	restaurantID: {
		type: String,
	},
	pricing: {
		type: String,
	},
	image: {
		imageName: [String],
		imageUrl: [String],
	},
	cuisineServed: {
		type: String,
	},
	address: {
		type: String,
	},
	contact: {
		type: String,
	},

	restaurantTags: {
		Taste_Tag: [String],
		Aroma_Tag: [String],
		Mouthfeel_Tag: [String],
		Visual_Tag: [String],
	},

	dishes: {
		type: Array,
	},
	restaurant_menu: {
		type: Array,
	}
});

module.exports = mongoose.model("restaurants", Restaurantdata);
