var express = require('express');
var router = express.Router();
var Comment = require('../models/comments')
var CampgroundModel = require('../models/campground')

router.post('/campgrounds/:id/comments', (req, res) => {
	CampgroundModel.findById(req.params.id, (err, campgroundFound) => {
		if(err) {
			res.send('There was an error')
			console.log(err);
		}
		else {
			console.log(req.body.comment);
			Comment.create({
				text: req.body.comment, 
				author: 'Jorge'
			}, function(err, comment){
				if(err){
					console.log(err);
				} else {
					campgroundFound.comments.push(comment);
					campgroundFound.save();
					console.log("Created new comment");
				}
			})
			console.log(campgroundFound);
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	})
})
module.exports = router;