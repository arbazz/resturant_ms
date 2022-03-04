const mongoose = require('../db/db');

let IngredientSchema = new mongoose.Schema({
	ingredient_name: {
		name: {
			type: String,
			required: "Required",
			trim: true,
		},
		region: {
			type: String,
			trim: true,
		},
		type: Array,
	},
	allergyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "allergy",
	},
	classification: String,
	category: String,
	section: String,
	plant_family: {
		type: String,
		lowercase: true,
		trim: true,
	},
	measuring_unit: {
		type: String,
		lowercase: true,
		trim: true,
	},
	secondary_measuring_unit: {
		type: Array,
	},

	//vegetarian
	mainCategory: {
		type: String,
	},

	//vegan
	subCategory: {
		type: String,
	},

	tags: {
		aroma: {
			name: {
				type: String,
				lowercase: true,
				trim: true,
			},
			score: {
				type: Number,
				trim: true,
			},
			type: Array,
		},
		texture: {
			name: {
				type: String,
				lowercase: true,
				trim: true,
			},
			score: {
				type: Number,
				trim: true,
			},
			type: Array,
		},
		visual: {
			name: {
				type: String,
				lowercase: true,
				trim: true,
			},
			score: {
				type: Number,
				trim: true,
			},
			type: Array,
		},
		taste: {
			name: {
				type: String,
				lowercase: true,
				trim: true,
			},
			score: {
				type: Number,
				trim: true,
			},
			type: Array,
		},
		mouthfeel: {
			name: {
				type: String,
				lowercase: true,
				trim: true,
			},
			score: {
				type: Number,
				trim: true,
			},
			type: Array,
		},
	},
	nutritional_values: {
		carbs: {
			amount: Number,
			unit: {
				type: String,
				default: "%",
			},
		},
		calories: {
			amount: Number,
			unit: {
				type: String,
				default: "KJoule",
			},
		},
		fats: {
			amount: Number,
			unit: {
				type: String,
				default: "%",
			},
		},
		protein: {
			amount: Number,
			unit: {
				type: String,
				default: "%",
			},
		},
		vitamins: {
			amount: Number,
			unit: {
				type: String,
				default: "%",
			},
		},
		cholestrol: {
			amount: Number,
			unit: {
				type: String,
				default: "%",
			},
		},
	},
	slug: String,
	miscellaneous: String,
	scoville_scale: {
		min: Number,
		max: Number,
	},
	meat_type: {
		type: String,
		lowercase: true,
		trim: true,
	},
	part_of_meat: {
		type: String,
		lowercase: true,
		trim: true,
	},
	bone_existence: {
		type: String,
		lowercase: true,
		trim: true,
	},
	cuts: {
		type: String,
		lowercase: true,
		trim: true,
	},
	source: {
		type: String,
		lowercase: true,
		trim: true,
	},
	type_of_meat: {
		type: String,
		lowercase: true,
		trim: true,
	},
	meat_variety: {
		type: String,
		lowercase: true,
		trim: true,
	},
	fat_percentage: String,
	cooking_recommendations: String,
	images: Array,
	type_of_condiment: String,
	type_1: String,
	type_2: String,
	type_3: String,
	allergies:{
		type:Array,
		default:[]
	},
});

module.exports = mongoose.model("ingredients", IngredientSchema);
