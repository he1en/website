var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var env = require('node-env-file');
env(__dirname + '/.env');
require("node-jsx").install();
var React = require('react/addons');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Main site content here.
app.get('/', function(req, res) {
    var Home = React.createFactory(require('./client/components/home.jsx'));
    res.render('index.ejs', {content: React.renderToString(Home({}))});
});

// to import from node modules
app.use('/bootstrap',
	express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));

// host resume
app.use('/resume', function(req, res) {
    res.redirect('/resume.pdf')
});

// set 404
app.get('*', function(req, res) {
    var NotFound = React.createFactory(require('./client/components/not-found.jsx'));
    res.render('index.ejs', {content: React.renderToString(NotFound({}))});
});


module.exports = app;
