'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
  .controller('LoginCtrl', function ($scope, $location, UserService, $rootScope) {
	
	var token = JSON.parse(window.localStorage.getItem('TrustedToken'));
	if(typeof token == "undefined" || token == null){
	 	  $rootScope.session = false;
    }else{
    	$rootScope.session = true;
		$location.path('/projects');
    }
	$scope.error = false;
	$scope.login = function(){
			
        var hasErrors = false;
		
		if(typeof $scope.username === "undefined" || $scope.username == ""){
            angular.element('#user').parent().addClass('has-error');
            angular.element('#user').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#user').parent().removeClass('has-error');
            angular.element('#user').siblings('.help-block').addClass('ng-hide');
        }
		
		if(typeof $scope.password === "undefined" || $scope.password == ""){
            angular.element('#password').parent().addClass('has-error');
            angular.element('#password').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#password').parent().removeClass('has-error');
            angular.element('#password').siblings('.help-block').addClass('ng-hide');
        }
		
        if (hasErrors) {
            return false;
        }else{
			$scope.loading = true;
			$scope.message = "Please wait";			
        	UserService.Login($scope.username, $scope.password).then(LoginSuccess, LoginError);
        }

		
		function LoginSuccess(response){
			$scope.loading = false;
			$location.path('/projects');
		}
		
		function LoginError(error){
			$scope.loading = false;
			$scope.error = true;
			$scope.errorMessage = "Unable to login with provided credentials.";
		}
	}
  });
