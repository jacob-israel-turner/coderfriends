var app = angular.module('friendsApp');

app.controller('friendCtrl', function($scope, $routeParams, githubService){
	// githubService.getActivity
	console.log($routeParams.github_username);
});