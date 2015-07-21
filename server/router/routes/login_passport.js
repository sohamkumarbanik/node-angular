// we need express
var express = require('express');
// intialize the router
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../../database');
var User = db.users;
var bCrypt = require('bcrypt-nodejs');
var color = require('cli-color');


module.exports = function(passport){

	router.post('/', 
		passport.authenticate('local', { failureRedirect: '/' }),
  		function(req, res) {
  			var body = req.body;
  			console.log(body.loginid);
    		res.redirect('/home');
  		}
	);
    return router;
}

/*router.post('/', passport.authenticate('local', { failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/');
	}

);
*/
//module.exports = router;