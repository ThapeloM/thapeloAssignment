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
            $scope.$parent.message = "please wait...";
            $scope.$parent.loading = true;
        	UserService.Login($scope.username, $scope.password).then(LoginSuccess, LoginError);
        }

		
		function LoginSuccess(response){
			$scope.$parent.loading = false;
			$location.path('/projects');
		}
		
		function LoginError(error){
			$scope.$parent.loading = false;
            $scope.$parent.alerts = [{
                type: 'growl-error',
                msg: "invalid username or password"
            }];
		}
	}
  });
