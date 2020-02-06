var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var CampgroundModel = require('./models/campground');
var Comment = require('./models/comments');
var seedsDB = require('./seeds');
var passport = require('passport');
var methodOverride = require('method-override')
var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes = require('./routes/comments');
var indexRoutes = require('./routes/index');
var LocalStrategy = require('passport-local');
var User = require('./models/user')

seedsDB();

mongoose.connect('mongodb+srv://deloss:password1234@cluster0-zimcv.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser : true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));
app.use(require('express-session')({
	secret: 'Wtf is secret?!',
	resave: false,
	saveUninitialized: false,
}));
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
})

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, () => {
	console.log("App has started.")
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