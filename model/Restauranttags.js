const mongoose = require('../db/db');
const restaurantTagsSchema = new mongoose.Schema({

	commonFlavors: {
		Taste_Tag: [Array],
		Aroma_Tag:[Array],
		Mouthfeel_Tag: [Array],
	},

	restId: {
		type: mongoose.Schema.Types.ObjectId
	},
	restaurantName: String

})

module.exports = mongoose.model("restaurantTags", restaurantTagsSchema,'restauranttags')