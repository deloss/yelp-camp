var express = require('express')
var app = express()
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

var campgrounds = [{
	name: 'Campground example',
	image: 'https://s3.amazonaws.com/pdugallery2/23539/big_DSC04353_.jpg'
},
{
	name: 'Beach houes',
	image: 'https://s3.amazonaws.com/pdugallery2/23539/big_01-DSC00026.jpg'
}];

app.listen(3000, '0.0.0.0', () => {
	console.log("App has started.")
})

app.get('/', (req, res) => {
	res.render("homepage");
})

app.get('/campgrounds', (req, res) => {
	res.render('campgrounds', {campgrounds});
})

app.post('/campgrounds', (req, res) => {
	var newCampgroundTitle = req.body.title; 
	var newCampgroundImageUrl = req.body.image;
	if(newCampgroundTitle && newCampgroundImageUrl) {
		campgrounds.push({name: newCampgroundTitle, image: newCampgroundImageUrl});
		res.redirect('/campgrounds');
	} else {
		res.send('There was an error')
	}
})

app.get('/campgrounds/new', (req, res) => {
	res.render('new-campground');
})