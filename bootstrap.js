module.exports = function(app, express) {

    var exphbs  = require('express-handlebars');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var fs = require('fs');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    app.set('trust proxy', 'loopback');


    // setup the logger and only log errors
    var accessLogStream = fs.createWriteStream('visiting_bgm.log', 
    	{ flags: 'a' });
    app.use(logger('combined', { stream: accessLogStream,
        skip: function (req, res) { return res.statusCode < 400 } }));


    app.use(favicon(__dirname + '/public/assets/images/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser('session_secret'));
    app.use(express.static(path.join(__dirname, 'assets')));


	//Routes
	var db = require('./models');
    require('./router')(app, db);

}
