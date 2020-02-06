var express = require('express');
var router = express.Router();
var CampgroundModel = require('../models/campground')

router.get('/campgrounds', (req, res) => {
	CampgroundModel.find({} , (error, camps) => {
		if(!error) {
			console.log(camps);
			res.render('campgrounds/campgrounds', {campgrounds: camps});
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
				camp.author.id = req.user._id;
				camp.author.username = req.user.username;
				camp.save();
				console.log(camp);
				res.redirect('/campgrounds');
			} else {
				res.send("There was an error");
			}
		});
		
	} else {
		res.send('There was an error')
	}
})

router.get('/campgrounds/new', isLoggedIn, (req, res) => {
	res.render('campgrounds/new-campground');
})

router.get('/campgrounds/:id/edit', isLoggedIn, (req, res) => {
	CampgroundModel.findById(req.params.id, (err, foundCampground) => {
		if(err) {
			console.log(err);
			res.send("There was an error");
		} else {
			if(foundCampground.author.id.equals(req.user._id))
				res.render('campgrounds/edit', {campground: foundCampground});
			else
				res.send("You are not authorized to edit that campground");
		}
	})
	
})

router.put('/campgrounds/:id/edit', (req, res) => {
	CampgroundModel.findByIdAndUpdate(req.params.id, {title: req.body.title, imageUrl: req.body.imageUrl}, (err, newCampground) => {
		if(err) {
			console.log(err);
			res.send("There was an error");
		} else {
			res.redirect('/campgrounds');
		}
	});
})

router.delete('/campgrounds/:id', (req, res) => {
	CampgroundModel.findByIdAndDelete(req.params.id, (err) => {
		if(err) {
			console.log(err);
			res.send("There was an error");
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds');
		}
	})
})

router.get('/campgrounds/:id', (req, res) => {
	CampgroundModel.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err) {
			console.log("The campground doesnt exist");
			res.send("The campground doesnt exist");
		} else {
			console.log(foundCampground);
			res.render("campgrounds/campground-details", {campground: foundCampground});
		}
	})
})

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		next()
	else
		res.redirect('/login')
}
module.exports = router;