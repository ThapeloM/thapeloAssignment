'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:ViewtaskCtrl
 * @description
 * # ViewtaskCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
  .controller('ViewtaskCtrl', function (ProjectService, $scope, $location,$rootScope,$window, $routeParams) {
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
	$scope.loading = true;
	$scope.success = false;
	$scope.message = "loading";
	var projectID = $routeParams.id;
	
	ProjectService.GetAProject(projectID).then(ProjetsSuccess,ProjectsError);


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
			ProjectService.GetAProject(projectID).then(ProjetsSuccess,ProjectsError);
		}
	}
	
	function DeleteError(error){
		$scope.loading = false;
		$scope.error = true;
		scope.errorMessage = "Oh snap! Something went wrong, please try again";
	}
	
	function ProjetsSuccess(response){
		if(response.status == 200){
			if(response.data.task_set.length > 0){
				$scope.projecTasks = response.data.task_set;
				$scope.rowCollection = $scope.projecTasks;
			}else{
				$scope.info = true;
				$scope.infoMessage = "No Tasks available"
			}
			$scope.loading = false;			
		}
	}
		
	function ProjectsError(error){
		$scope.loading = false;
		$scope.error = true;
		scope.errorMessage = "Oh snap! Something went wrong, please try again";
	}
	
	$scope.addTask = function(){
		$location.path('/createtask');
	}
	
  });
