var express = require('express')
var app = express()

app.set('view engine', 'ejs');

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