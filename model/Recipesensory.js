const mongoose = require('../db/db');

const recipeSensorySchema = new mongoose.Schema({
	recipeId: String,

	dishImg: String,

	nutrionalValue: [
		{
			carbohydrate: Number,

			fat: Number,

			fibre: Number,

			protein: Number,
		},
	],

	sensoryProfile: {
		Mouthfeel_Tag: [String],
		Aroma_Tag: [String],
		Taste_Tag: [String],
		Visual_Tag: [String],
	},

	calories: {
		Calories_value: {
			type: Number,
		},
		Calories_unit: {
			type: String,
		},
	},
});

module.exports = mongoose.model(
	"Recipesensory",
	recipeSensorySchema,
	"recipesSensory"
);
