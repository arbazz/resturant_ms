const mongoose = require('../db/db');

const dummyDataSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},

	userName: {
		type: String,
	},
	image: {
		type: String,
	},
	auth_id: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		lowercase: true,
	},

	age: {
		type: Number,
	},
	gender: {
		type: String,
	},

	//type = veg
	mainCategory: {
		type: String,
	},

	//subtype = vegan
	subCategory: {
		type: String,
	},

	nativeCuisine: [{
		type: mongoose.Schema.Types.ObjectId,
	}],

	regionalCuisine: [{
		type: mongoose.Schema.Types.ObjectId,
	}],

	likedCuisine: [
		{
			type: mongoose.Schema.Types.ObjectId,
		},
	],

	likedDishes: [{ type: mongoose.Schema.Types.ObjectId }],

	dislikedDishes: [{ type: mongoose.Schema.Types.ObjectId }],

	parentAllergies: [{ type: mongoose.Schema.Types.ObjectId }],

	createdAt: {
		type: Date,
		default: Date.now,
	},

	updatedAt: {
		type: Date,
	},
});

module.exports = mongoose.model("Dummydata", dummyDataSchema, "userdummydata");
