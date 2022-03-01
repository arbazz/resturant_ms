const mongoose = require('../db/db');

let CategorySchema = new mongoose.Schema({
	classification: String,
	category: String,
	section: String,
	slug: String,
});

module.exports = mongoose.model("categorisation", CategorySchema);
