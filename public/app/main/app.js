var app = angular.module('friendsApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			// templateUrl: 'index.html',
			controller: 'mainCtrl'
		})
		.when('/home', {
			templateUrl: './templates/home.html',
			controller: 'homeCtrl'
		})
		.when('/friend/:github_username', {
			templateUrl: './templates/friend.html',
			controller: 'friendCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
});