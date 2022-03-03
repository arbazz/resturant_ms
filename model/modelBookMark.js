const mongoose = require('../db/db');

const userBookmarkSchema = new mongoose.Schema({
	userId: {
        type:String
      },
    bookmarks: [{
        name: {
          type:String
        },
        data: [
			{
				type: {
                    type:String
                  },
				id: {
                    type:String
                  }
			},
		]
    }]
})

module.exports = mongoose.model("UserBookmark", userBookmarkSchema)