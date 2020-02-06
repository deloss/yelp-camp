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
				text: req.body.comment
			}, function(err, comment){
				if(err){
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
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

router.delete('/campgrounds/:campgroundId/comments/:commentId', (req, res) => {
	Comment.findByIdAndDelete(req.params.commentId, (err, campgroundFound) => {
		if(err) {
			res.send('There was an error')
			console.log(err);
		}
		else {
			console.log('Comment succesfully deleted');
			res.redirect(`/campgrounds/${req.params.campgroundId}`)
		}
	})
})

module.exports = router;