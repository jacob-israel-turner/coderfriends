var app = angular.module('friendsApp');

app.service('githubService', function($http){
	this.getUser = function(){
		return $http(
			{
				method: 'GET',
				url: 'http://localhost:9007/user'
			})
	};
	this.getFollowing = function(){
		return $http(
		{
			method: 'GET',
			url: 'http://localhost:9007/api/github/following'
		})
	}
});