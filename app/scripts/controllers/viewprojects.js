'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
.controller('ProjectsCtrl', function (ProjectService, $scope, $location,$window,$rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	$scope.loading = true;
	$scope.message = "loading";
	$scope.success = false;
	$scope.error = false;
	$rootScope.session = true;
	$location.search('id', null)
	
	//get project list
	ProjectService.Projects().then(ProjetsSuccess,ProjectsError);
	
	//create a project
	$scope.addProject = function(){
		$location.path('/createEditproject');
	}
	
	//view tasks
	$scope.view = function(id,project){
		$window.localStorage.setItem('projecttasks', JSON.stringify(project));
		$location.path('/viewtasks').search({id: id});
	}
	
	//edit project
	$scope.edit = function(project){
		$window.localStorage.setItem('project', JSON.stringify(project));
		$location.path('/createEditproject');
	}
	
	//delete project
	$scope.delete = function(id){
		$scope.loading = true;
		$scope.message = "Please wait";
		ProjectService.DeleteProject(id).then(DeleteSuccess,ProjectsError);
	}
	
	function ProjetsSuccess(response){
		if(response.status == 200){
            $scope.projects = response.data;
            $scope.rowCollection = $scope.projects;
			$scope.loading = false;
			
		}
	}
	
	function DeleteSuccess(response){
		if(response.status == 204){
			$scope.success = true;
			$scope.successMessage = "Project successfully deleted";
            ProjectService.Projects().then(ProjetsSuccess,ProjectsError);	
		}
	}
	
	function ProjectsError(error){
		$scope.loading = false;
		$scope.error = true;
		scope.errorMessage = "Oh snap! Something went wrong, please try again";
	}
	
});
 