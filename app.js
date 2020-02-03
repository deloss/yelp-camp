var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var CampgroundModel = require('./models/campground');
var seedsDB = require('./seeds');

seedsDB();

mongoose.connect('mongodb+srv://deloss:password1234@cluster0-zimcv.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser : true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));



app.listen(3000, '0.0.0.0', () => {
	console.log("App has started.")
})

app.get('/', (req, res) => {
	res.render("homepage");
})

app.get('/campgrounds', (req, res) => {
	CampgroundModel.find({} , (error, camps) => {
		if(!error) {
			console.log(camps);
			res.render('campgrounds', {campgrounds: camps});
		} else {
			res.send("There was an error");
		}
	});
	
})

app.post('/campgrounds', (req, res) => {
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

app.get('/campgrounds/:id', (req, res) => {
	CampgroundModel.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err) {
			console.log("The campground doesnt exist");
			res.send("The campground doesnt exist");
		} else {
			res.render("campground-details", {campground: foundCampground});
		}
	})
})

app.get('/campgrounds/new', (req, res) => {
	res.render('new-campground');
})

// MOBILE SECTION

app.get('/mobile/campgrounds', (req, res) => {
	CampgroundModel.find().populate("comments").exec((error, camps) => {
		if(!error) {
			console.log(camps);
			res.send(camps);
		} else {
			console.log(error);
		}
	});
	
})


//