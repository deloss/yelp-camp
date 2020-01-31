var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://deloss:password1234@cluster0-zimcv.mongodb.net/test?retryWrites=true&w=majority');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

var campgroundSchema = new mongoose.Schema({
	title: String,
	imageUrl: String
});

var CampgroundModel = mongoose.model("Campground", campgroundSchema);

app.listen(3000, '0.0.0.0', () => {
	console.log("App has started.")
})

app.get('/', (req, res) => {
	res.render("homepage");
})

app.get('/campgrounds', (req, res) => {
	CampgroundModel.create({title: "hola", imageUrl: "urll..."})
	var campgrounds = CampgroundModel.find({} , (error, camp) => {
		if(!error) {
			console.log(camp);
			res.render('campgrounds', {campgrounds: camp});
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

app.get('/campgrounds/new', (req, res) => {
	res.render('new-campground');
})