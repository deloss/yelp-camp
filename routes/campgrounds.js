var express = require('express');
var router = express.Router();
var CampgroundModel = require('../models/campground')

router.get('/campgrounds', (req, res) => {
	CampgroundModel.find({} , (error, camps) => {
		if(!error) {
			console.log(camps);
			res.render('campgrounds', {campgrounds: camps});
		} else {
			res.send("There was an error");
		}
	});
	
})

router.post('/campgrounds', (req, res) => {
	var newCampgroundTitle = req.body.title; 
	var newCampgroundImageUrl = req.body.image;
	if(newCampgroundTitle && newCampgroundImageUrl) {
		CampgroundModel.create({title: newCampgroundTitle, imageUrl: newCampgroundImageUrl}, (error, camp) => {
			if(!error) {
				res.redirect('/campgrounds');
			} else {
				res.send("There was an error");
			}
		});
		
	} else {
		res.send('There was an error')
	}
})

router.get('/campgrounds/new', (req, res) => {
	res.render('new-campground');
})


router.get('/campgrounds/:id', (req, res) => {
	CampgroundModel.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err) {
			console.log("The campground doesnt exist");
			res.send("The campground doesnt exist");
		} else {
			console.log(foundCampground);
			res.render("campground-details", {campground: foundCampground});
		}
	})
})
module.exports = router;