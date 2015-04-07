var express = require('express');
var router = express.Router();

module.exports = router.get('/', function(req, res) {
//	return res.json({test: 'test'})
	res.render('index');
});
