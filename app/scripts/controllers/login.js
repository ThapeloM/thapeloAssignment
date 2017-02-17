'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
  .controller('LoginCtrl', function ($scope, $location, UserService) {
	
	$scope.login = function(){
		if(typeof $scope.username === "undefined" || $scope.username == ""){
			alert("username should not be empty");
			return false;
		}
		
		if(typeof $scope.password === "undefined" || $scope.password == ""){
			alert("password should not be empty");
			return false;
		}
		
		UserService.Login($scope.username, $scope.password).then(LoginSuccess, LoginError);
		
		function LoginSuccess(response){
			$location.path('/projects');
		}
		
		function LoginError(error){
			alert('Login Failed');
		}
	}
  });
