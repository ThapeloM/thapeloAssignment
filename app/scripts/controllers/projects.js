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
	$scope.edit = function(project){
		$window.localStorage.setItem('project', JSON.stringify(project));
		$location.path('/editproject');
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
  .controller('EditProjectCtrl', function (ProjectService, $scope, $location, $routeParams, $window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


	$scope.projectDetails = JSON.parse($window.localStorage.getItem('project'));
	
	if($scope.projectDetails.is_billable){
		document.getElementById("biltrue").selected = "true";
	}else{
		document.getElementById("bilfalse").selected = "true";
	}
	if($scope.projectDetails.is_active){
		document.getElementById("activeTrue").selected = "true";
	}else{
		document.getElementById("activeFalse").selected = "true";
	}
    
	
	$scope.update = function(project){
        var hasErrors = false;
		
		if(project){
			project.is_billable = $("#billable").val();
			project.is_active = $("#active").val();
		}
	
		console.log(project);
        if (!project || !project.title) {
            angular.element('#projectTitle').parent().addClass('has-error');
            angular.element('#projectTitle').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#projectTitle').parent().removeClass('has-error');
            angular.element('#projectTitle').siblings('.help-block').addClass('ng-hide');
        }
		
        if (!project || !project.description) {
            angular.element('#description').parent().addClass('has-error');
            angular.element('#description').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#description').parent().removeClass('has-error');
            angular.element('#description').siblings('.help-block').addClass('ng-hide');
        }
		
        if (!project || !project.start_date) {
            angular.element('#startdate').parent().addClass('has-error');
            angular.element('#startdate').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#startdate').parent().removeClass('has-error');
            angular.element('#startdate').siblings('.help-block').addClass('ng-hide');
        }
		
        if (!project || !project.end_date) {
            angular.element('#enddate').parent().addClass('has-error');
            angular.element('#enddate').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#enddate').parent().removeClass('has-error');
            angular.element('#enddate').siblings('.help-block').addClass('ng-hide');
        }
		
        if (!project || !project.is_billable) {
            angular.element('#billable').parent().addClass('has-error');
            angular.element('#billable').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#billable').parent().removeClass('has-error');
            angular.element('#billable').siblings('.help-block').addClass('ng-hide');
        }
		
        if (!project || !project.is_active) {
            angular.element('#active').parent().addClass('has-error');
            angular.element('#active').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#active').parent().removeClass('has-error');
            angular.element('#active').siblings('.help-block').addClass('ng-hide');
        }


        if (hasErrors) {
            return false;
        }else{
        	ProjectService.EditProject(project).then(ProjetsSuccess,ProjectsError);
        }
			
	}
	
	function ProjetsSuccess(response){		
		if(response.status == 200){
			$window.localStorage.setItem('project', JSON.stringify(response.data));
		}
	}
	function ProjectsError(error){
		console.log(error)
	}
	
	$scope.addProject = function(){
		$location.path('/createproject');
	}

	
  });
  