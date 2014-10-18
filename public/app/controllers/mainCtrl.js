var app = angular.module('friendsApp');

app.controller('mainCtrl', function($scope, githubService){
	githubService.getUser()
		.then(function(response){
			console.log(response);
			$scope.user = (response.data._json);
			// console.log($scope.user);
		});
});