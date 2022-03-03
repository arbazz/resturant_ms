const mongoose = require('../db/db');

const adminSchema = new mongoose.Schema({

	userName: {
		type: String,
	},

	password: {
		type: String,
	},

	doc: {
		type: Date,
		default: Date.now
	},

	dou: {
		type: Date
	},
})

module.exports = mongoose.model("Admin", adminSchema)