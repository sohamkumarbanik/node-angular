'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  /*.controller('LoginCtrl', function () {

  });*/
	.controller('LoginCtrl', function ($scope, $http) { // note the added $http depedency

		// Here we're creating some local references
		// so that we don't have to type $scope every
		// damn time
		var user, login;

		// Here we're creating a scope for our Signup page.
		// This will hold our data and methods for this page.
		$scope.login = login = {};

		// In our login.html, we'll be using the ng-model
		// attribute to populate this object.
		login.user = user = {};

		// This is our method that will post to our server.
		login.submit = function () {

			// make sure all fields are filled out...
			// aren't you glad you're not typing out
			// $scope.signup.user.firstname everytime now??
			if (
				!user.loginid ||
				!user.password
			) {
				alert('Please fill out all form fields.');
				return false;
			}

			// Just so we can confirm that the bindings are working
			console.log(user);

			// Make the request to the server
			var request = $http.post('/login', user);

			request.success(function (data) {
				console.log(data);
			});

			request.error(function (data) {
				console.log(data);
			});

		};
		
	});