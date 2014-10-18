var app = angular.module('friendsApp');

app.controller('homeCtrl', function($scope, githubService){
	githubService.getFollowing()
		.then(function(response){
			$scope.friendArray = response.data;
			console.log($scope.friendArray);
	})
});