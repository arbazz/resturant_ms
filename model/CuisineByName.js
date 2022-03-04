const mongoose = require('../db/db');

const testCuisineSchema = new mongoose.Schema({
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

module.exports = mongoose.model("CuisineByName", testCuisineSchema);
