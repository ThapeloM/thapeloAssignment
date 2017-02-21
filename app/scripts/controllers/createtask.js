'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:CreatetaskCtrl
 * @description
 * # CreatetaskCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
  .controller('CreatetaskCtrl', function ($scope,ProjectService,$rootScope,$routeParams,$location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
    var token = JSON.parse(window.localStorage.getItem('TrustedToken'));

    if(typeof token == "undefined" || token == null){
  	  $location.path("/login");
    }
	
    var existingtask = JSON.parse(window.localStorage.getItem('task'));
  
    if(typeof existingtask == "undefined" || existingtask == null){
		$scope.addMode = true;
    }
	
	// assigin values for edit mode
	if(!$scope.addMode){
		$scope.task = existingtask;
	}
	
	
    $scope.addMode = true;
    $rootScope.session = true;
	$scope.success = false;
	$scope.error = false;
	
	$scope.save = function(task){
		
        var hasErrors = false;
        if (!task || !task.title) {
            angular.element('#taskTitle').parent().addClass('has-error');
            angular.element('#taskTitle').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#taskTitle').parent().removeClass('has-error');
            angular.element('#taskTitle').siblings('.help-block').addClass('ng-hide');
        }
		
        if (!angular.element('#duedate').val()) {
            angular.element('#duedate').parent().parent().addClass('has-error');
            angular.element('#duedate').parent().siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#duedate').parent().parent().removeClass('has-error');
            angular.element('#duedate').parent().siblings('.help-block').addClass('ng-hide');
        }
		
        if (!task || !task.hours) {
            angular.element('#taskHours').parent().addClass('has-error');
            angular.element('#taskHours').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#taskHours').parent().removeClass('has-error');
            angular.element('#taskHours').siblings('.help-block').addClass('ng-hide');
        }
		

        if (hasErrors) {
            return false;
        }else{
			task.dueDate = angular.element('#duedate').val();
			task.pk = $routeParams.id;
			$scope.loading = true;
			$scope.message = "Please wait";
        	ProjectService.CreateTask(task).then(TaskSuccess,ProjectsError);
        }
			
	}
	
	function TaskSuccess(response){
		
		if(response.status == 201 || response.status == 200){
			$scope.loading = false;
			$scope.success = true;
			$scope.task = {};
		    angular.element('#duedate').val("");
			$scope.successMessage = "Task successfully created";
		}else{
			$scope.loading = false;
			$scope.error = true;
			$scope.errorMessage = "Oh snap! Something went wrong, please try again";
		}
		
	}
	
	function ProjectsError(error){
		$scope.loading = false;
		$scope.error = true;
		$scope.errorMessage = "Oh snap! Something went wrong, please try again";
	}
	
  });
