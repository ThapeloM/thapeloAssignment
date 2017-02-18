'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
  .controller('ProjectsCtrl', function (ProjectService, $scope, $location,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	
	//get project list
	ProjectService.Projects().then(ProjetsSuccess,ProjectsError);
	
	//view tasks
	$scope.view = function(id){
		$location.path('/viewprojecttasks').search({id: id});
	}
	
	//edit project
	$scope.edit = function(id){
		$location.path('/viewprojecttasks').search({id: id});
	}
	
	//delete project
	$scope.delete = function(id){
		ProjectService.DeleteProject(id).then(DeleteSuccess,ProjectsError);
	}
	
	function ProjetsSuccess(response){
		if(response.status == 200){
            $scope.projects = response.data;
            $scope.rowCollection = $scope.projects;
		}
	}
	
	function DeleteSuccess(response){
		if(response.status == 204){
            $window.location.reload();
		}
	}
	
	function ProjectsError(error){
		console.log(error)
	}
	
	$scope.addProject = function(){
		$location.path('/createproject');
	}

	
  })
  
  .controller('ViewProjectTasksCtrl', function (ProjectService, $scope, $location,$routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
		
	var id = $routeParams.id;
	$scope.tasks = [];
	ProjectService.ViewTasks(id).then(TasksSuccess,ProjectsError);

	function TasksSuccess(response){
		if(response.status == 200){
			$scope.projectName = response.data.project_data.title;
            $scope.tasks.push(response.data);
		}
	}
	
	function ProjectsError(error){
		console.log(error)
	}
	
	$scope.addProject = function(){
		$location.path('/createproject');
	}

	
  })
  .controller('EditProjectCtrl', function (ProjectService, $scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	
	//get project list
	ProjectService.Projects().then(ProjetsSuccess,ProjectsError);
	
	
	//view tasks
	$scope.view = function(id){
		ProjectService.ViewTasks(id).then(TasksSuccess,ProjectsError);
	}
	//edit project
	$scope.edit = function(id){
		
	}
	
	//delete project
	$scope.delete = function(id){
		
	}
	
	function ProjetsSuccess(response){
		
		
		if(response.status == 200){
			
			console.log(response.data)
            $scope.projects = response.data;
            $scope.rowCollection = $scope.projects;
		}
	}
	
	function TasksSuccess(response){
		if(response.status == 200){
            $scope.tasks = response.data;
			$scope.rowCollection = $scope.tasks;
		}
	}
	
	function ProjectsError(error){
		console.log(error)
	}
	
	$scope.addProject = function(){
		$location.path('/createproject');
	}

	
  });
  