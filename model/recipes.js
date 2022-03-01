const mongoose = require('../db/db');
const Cuisine = require("./cuisines");

let RecipesSchema = new mongoose.Schema({
	dishName: [
		{
			name: {
				type: String,
				trim: true,
				lowercase: true,
			},
		},
	],
	// 	region: {
	// 		type: String,
	// 		trim: true,
	// 		lowercase: true,
	// 	},
	// 	type: Array,
	// },
	cuisine: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "cuisine",
		required: true,
	},
	compexityScore: Number,

	serve_size: Number,

	sensoryProfile: {
		aromaTags: [String],
		tasteTags: [String],
		mouthfeelTags: [String],
		visualTags: [String],
		textureTags: [String],
		visualTags: [String],
	},

	calories: {
		number: {
			type: Number,
		},
		unit: {
			type: String,
		},
	},
	nutrionalTags: [
		{
			carbohydrates: Number,
			protein: Number,
			carbs: Number,
			fibre: Number,
		},
	],

	serve_measuring_unit: {
		type: String,
		trim: true,
	},
	type_of_dish: {
		type: String,
		trim: true,
		lowercase: true,
	},
	meal_course: {
		type: String,
		trim: true,
		lowercase: true,
	},
	ingredients: [
		{
			quantity: Number,
			measuring_unit: {
				type: String,
				lowercase: true,
			},
			ingredient: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "ingredients",
				required: true,
			},
		},
	],
	// allergies:[String],
	parentCuisine: {
		type: mongoose.Schema.Types.ObjectId,
	},

	childCuisine: {
		type: mongoose.Schema.Types.ObjectId,
	},

	parentAllergies: [String],
	childAllergies: [String],
	preparation: {
		type: String,
	},
	direction: {
		type: String,
	},
	mainCategory: {
		typr: String,
	},
	subCategory: {
		typr: String,
	},
	isKosher: Boolean,
	isHalal: Boolean,
	image: {
		imageName: {
			type: String,
		},
		imageUrl: {
			type: String,
		},
	},
	isEggeterian: Boolean,
	isPescatarian: Boolean,
	isVegan: Boolean,
	isVegetarian: Boolean,

	garnish: String,
	slug: String,
});

module.exports = mongoose.model("recipes", RecipesSchema);
