// we need express
var express = require('express');
// intialize the router
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;

router.post('/', function (req, res) {
    // The posted information from the front-end
    var body = req.body;
    // Current time this occurred
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    // Check to see if the user already exists
    // using their email address
    Users.findOne({

        $or: [{'email': body.loginid}, {'username': body.loginid}]

    }, function (err, user) {

        // If there's an error, log it and return to user
        if (err) {

            // Nice log message on your end, so that you can see what happened
            console.log('Couldn\'t login ' +  color.red(body.loginid) + ' because of: ' + err);

            // send the error
            res.status(500).json({
                'message': 'Internal server error from signing up new user. Please contact support@yourproject.com.'
            });
        }
        // If the user already exists...
        if (user) {
            res.status(409).json({
                'message': user.firstname +' '+ user.lastname + ' exists!'
            });
            console.log(color.yellow(user.firstname +' '+ user.lastname) + color.green(' exists!'));
        }
    });

});

module.exports = router;
