var express = require('express');
var router = express.Router();

module.exports = router.get('/', function(req, res) {
	res.render('index', { title: "The Official Travel Guide to Bungoma" });
});


module.exports = router.get('/about', function(req, res) {
	res.render('about', { title: "The Official Travel Guide to Bungoma" });
});


module.exports = router.get('/contact', function(req, res) {
	res.render('contact', { title: "The Official Travel Guide to Bungoma" });
});


module.exports = router.get('/register', function(req, res) {
	res.render('register', { title: "The Official Travel Guide to Bungoma" });
});
