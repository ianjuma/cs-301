var express = require('express');
var router = express.Router();

module.exports = router.get('/', function(req, res) {
	res.render('index', { title: "Home" });
});


module.exports = router.get('/about', function(req, res) {
	res.render('about', { title: "About" });
});


module.exports = router.get('/contact', function(req, res) {
	res.render('contact', { title: "Contact Us" });
});


module.exports = router.get('/terms', function(req, res) {
	res.render('terms', { title: "Terms" });
});


module.exports = router.get('/privacy', function(req, res) {
	res.render('privacy', { title: "Privacy" });
});


module.exports = router.get('/destinations', function(req, res) {
	res.render('destinations', { title: "Destinations" });
});


module.exports = router.get('/register', function(req, res) {
	res.render('register', { title: "Register" });
});


module.exports = router.get('/travel', function(req, res) {
	res.render('travel', { title: "Travel" });
});


module.exports = router.get('/thankyou', function(req, res) {
	res.render('thankyou', { title: "Thanks" });
});