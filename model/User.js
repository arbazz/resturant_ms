const mongoose = require('../db/db');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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
		// required: true,
		trim: true,
		lowercase: true,
	},

	age: {
		type: Number,
	},
	gender: {
		type: String,
	},

	// //type = veg
	mainCategory: {
		type: String,
	},

	// //subtype = vegan
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

	bookMarkDishes: [
		{
			type: mongoose.Schema.Types.ObjectId,
		},
	],

	bookMarkRecipes: [
		{
			type: mongoose.Schema.Types.ObjectId,
		},
	],

	likedDishes: [{ type: mongoose.Schema.Types.ObjectId }],

	dislikedDishes: [{ type: mongoose.Schema.Types.ObjectId }],

	parentAllergies: [{ type: mongoose.Schema.Types.ObjectId }],

	dataType: {
		type: String,
	},

	preference: String,
	subPreference: String,

	// tokens: [
	// 	{
	// 		token: {
	// 			type: String,
	// 			required: true,
	// 		},
	// 	},
	// ],

	createdAt: {
		type: Date,
		default: Date.now,
	},

	updatedAt: {
		type: Date,
	},
});

userSchema.methods.toJSON = function () {
	return this.toObject();
};

userSchema.methods.generateToken = async function (cb) {
	const token = jwt.sign({ _id: this._id.toString() }, "hello");
	// this.tokens = this.tokens.concat({ token });
	console.log(this);
	await this.save();
	return token;
};

userSchema.statics.findbyGoogleID = async (authID, email) => {
	const user = await User.findOne({ $or: [{ auth_id: authID }, { email }] });
	if (!user) {
		return { isExist: 0 };
	}
	return { isExist: 1, user_data: user };
};

const User = mongoose.model("User", userSchema);
module.exports = User;
