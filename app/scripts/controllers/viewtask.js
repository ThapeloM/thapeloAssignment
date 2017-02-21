'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:ViewtaskCtrl
 * @description
 * # ViewtaskCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
  .controller('ViewtaskCtrl', function (ProjectService, $scope, $location,$rootScope,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
    var token = JSON.parse(window.localStorage.getItem('TrustedToken'));
  
    if(typeof token == "undefined" || token == null){
  	  $location.path("/login");
    }

	$scope.info = false;
	$rootScope.session = true;
	
	var projectDetails = JSON.parse($window.localStorage.getItem('projecttasks'));
	
	if(projectDetails.task_set.length > 0){
		$scope.projecTasks = projectDetails.task_set;
		$scope.rowCollection = $scope.projecTasks;
	}else{
		$scope.info = true;
		$scope.infoMessage = "No Tasks available"
	}
	

	$scope.delete = function(id){
		$scope.loading = true;
		$scope.message = "loading";
		ProjectService.DeleteTask(id).then(DeleteSuccess,DeleteError);
	}

	function DeleteSuccess(response){
		$scope.loading = false;
		if(response.status == 204){
			$scope.success = true;
			$scope.successMessage = "Task successfully deleted";
            $window.location.reload();	
		}
	}
	
	function DeleteError(error){
		$scope.loading = false;
		$scope.error = true;
		scope.errorMessage = "Oh snap! Something went wrong, please try again";
	}
	
	
	$scope.addTask = function(){
		$location.path('/createtask');
	}
	
  });
