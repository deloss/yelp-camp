var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
	title: String,
	imageUrl: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

var CampgroundModel = mongoose.model("Campground", campgroundSchema);

module.exports = CampgroundModel;