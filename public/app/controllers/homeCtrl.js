var app = angular.module('friendsApp');

app.controller('homeCtrl', function($scope, githubService){
	githubService.getFollowing()
		.then(function(response){
			$scope.friends = response;
			console.log($scope.friends);
	})
});