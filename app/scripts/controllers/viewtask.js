'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:ViewtaskCtrl
 * @description
 * # ViewtaskCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
  .controller('ViewtaskCtrl', function (ProjectService, $scope, $location,$routeParams,$rootScope,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
    var token = JSON.parse(window.localStorage.getItem('TrustedToken'));
  
    if(typeof token == "undefined" || token == null){
  	  $location.path("/login");
    }
	var id = $routeParams.id;
	$scope.tasks = [];
	$scope.loading = true;
	$scope.message = "loading";
	$scope.info = false;
	$rootScope.session = true;
	ProjectService.ViewTasks(id).then(TasksSuccess,ProjectsError);
	
	$scope.delete = function(){
		$scope.loading = true;
		$scope.message = "loading";
		ProjectService.DeleteTask(id).then(DeleteSuccess,DeleteError);
	}

	function TasksSuccess(response){
		$scope.loading = false;
		if(response.status == 200){
			$scope.projectName = response.data.project_data.title;
            $scope.tasks.push(response.data);
		}
	}
	
	function ProjectsError(error){
		$scope.loading = false;
		$scope.info = true;
		$scope.infoMessage = "No Tasks available"
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
	
	$scope.logout = function(){
		window.localStorage.removeItem('TrustedToken');
		$location.path('/login');
	}
	
  });
