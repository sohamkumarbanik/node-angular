var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * Development Settings
 */

if ('development' == app.get('env')) {
// This will change in production since we'll be using the dist folder
app.use(express.static(path.join(__dirname, '../client/.tmp')));

// This covers serving up the index page
app.use(express.static(path.join(__dirname, '../client/app')));

// This is the new way to handle errors in Express 4. not errorHandler().
// For more about error-first best practices see http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

}

/**
 * Production Settings
 */
if('production' == app.get('env')) {
app.use(express.static(path.join(__dirname, '/dist')));
}

/* Add this to fire the server */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;