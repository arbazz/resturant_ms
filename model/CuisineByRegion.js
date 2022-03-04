const mongoose = require('../db/db');

const regionByCuisine = new mongoose.Schema({
	cuisineID: String,

	name: {
		type: String,
	},

	image: {
		imageName: {
			type: String,
		},
		imageUrl: {
			type: String,
		},
	},

	child: [
		{
			cuisineID: String,

			name: {
				type: String,
			},

			image: {
				imageName: {
					type: String,
				},
				imageUrl: {
					type: String,
				},
			},

			child: {
				type: Array,
			},
		},
	],

	doc: {
		type: Date,
		default: Date.now,
	},

	dou: {
		type: Date,
	},
});

module.exports = mongoose.model("CuisineByRegion", regionByCuisine);
