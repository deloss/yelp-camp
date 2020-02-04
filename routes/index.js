var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport')

router.get('/signup', (req, res) => {
	res.render('signup')
});

router.post('/signup', (req, res) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if(err) {
			console.log(err);
			res.redirect('/signup')
		} else {
			passport.authenticate('local')(req, res, () => {
				res.redirect('/');
			})
		}
	})
})

router.get('/login', (req, res) => {
	res.render('login')
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
}), (req, res) => {})

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
})

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		next()
	else
		res.redirect('/login')
}

router.get('/', (req, res) => {
	res.render("homepage");
})
module.exports = router;