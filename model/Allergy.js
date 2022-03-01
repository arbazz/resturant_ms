const mongoose = require('../db/db');

const allergySchema = new mongoose.Schema({

	// name : {
	//     type : String,
	//     required : "Required"
	// },
	// _id: mongoose.Schema.Types.ObjectId,

	// _id: mongoose.Schema.Types.ObjectId,
	// Parent: [{
		parentAllergy: {
			type: String
		},
		childAllergy: [{
			name: {
				type: String
			}
			// ,
			// aid: {
			// 	type:mongoose.Schema.Types.ObjectId
			// }
		}],
	// }],

	doc: {
		type: Date,
		default: Date.now
	},

	dou: {
		type: Date
	},
	// slug: String
})

module.exports = mongoose.model("Allergy", allergySchema)