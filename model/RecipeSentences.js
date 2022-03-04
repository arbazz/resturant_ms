const mongoose = require('../db/db');

let recipeSentences = new mongoose.Schema({
	recipe_id: {
		type: String,
	},

	dish_id: {
		type: String,
	},
	Ingredient: {
		type: String,
	},
	directions: {
		type: String,
	}
});
mongoose.set("debug", (collectionName, method, query, doc) => {
	console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});
module.exports = mongoose.model("recipe_sentences", recipeSentences);
