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
            $window.location.reload();	
		}
	}
	
	function ProjectsError(error){
		$scope.loading = false;
		$scope.error = true;
		scope.errorMessage = "Oh snap! Something went wrong, please try again";
	}
	
	$scope.addProject = function(){
		$location.path('/createproject');
	}
	
	$scope.logout = function(){
		window.localStorage.removeItem('TrustedToken');
		$location.path('/login');
	}

	
  })
  
  .controller('ViewProjectTasksCtrl', function (ProjectService, $scope, $location,$routeParams,$rootScope) {
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
		if(response.status == 204){
			$scope.success = true;
			$scope.successMessage = "Project successfully deleted";
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
	
	
  })
  .controller('EditProjectCtrl', function (ProjectService, $scope, $location, $routeParams, $window, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

	  var token = JSON.parse(window.localStorage.getItem('TrustedToken'));
  
	  if(typeof token == "undefined" || token == null){
	  	  $location.path("/login");
	   }
	$scope.success = false;
	$scope.error = false;
	$rootScope.session = true;
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
		
        if (!angular.element('#startdate').val()) {
            angular.element('#startdate').parent().parent().addClass('has-error');
            angular.element('#startdate').parent().siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#startdate').parent().parent().removeClass('has-error');
            angular.element('#startdate').parent().siblings('.help-block').addClass('ng-hide');
        }
		
        if (!angular.element('#enddate').val()) {
            angular.element('#enddate').parent().parent().addClass('has-error');
            angular.element('#enddate').parent().siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#enddate').parent().parent().removeClass('has-error');
            angular.element('#enddate').parent().siblings('.help-block').addClass('ng-hide');
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
			
			project.start_date = angular.element('#startdate').val();
			project.end_date = angular.element('#enddate').val();
			$scope.loading = true;
			$scope.message = "Please wait";
        	ProjectService.EditProject(project).then(ProjetsSuccess,ProjectsError);
        }
			
	}
	
	function ProjetsSuccess(response){		
		if(response.status == 200){
			$window.localStorage.setItem('project', JSON.stringify(response.data));
			$scope.loading = false;
			$scope.success = true;
			$scope.successMessage = "Project successfully updated";
		}
	}
	function ProjectsError(error){
		$scope.loading = false;
		$scope.error = true;
		$scope.errorMessage = "Oh snap! Something went wrong, please try again";
	}
	
	$scope.addProject = function(){
		$location.path('/createproject');
	}
	
	$scope.logout = function(){
		window.localStorage.removeItem('TrustedToken');
		$location.path('/login');
	}
	
  })
  .controller('CreateprojectCtrl', function ($scope,ProjectService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	$scope.success = false;
	$scope.error = false;
	
	$scope.save = function(project){
        var hasErrors = false;
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
		
        if (!angular.element('#startdate').val()) {
            angular.element('#startdate').parent().parent().addClass('has-error');
            angular.element('#startdate').parent().siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#startdate').parent().parent().removeClass('has-error');
            angular.element('#startdate').parent().siblings('.help-block').addClass('ng-hide');
        }
		
        if (!angular.element('#enddate').val()) {
            angular.element('#enddate').parent().parent().addClass('has-error');
            angular.element('#enddate').parent().siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#enddate').parent().parent().removeClass('has-error');
            angular.element('#enddate').parent().siblings('.help-block').addClass('ng-hide');
        }
		
        if (!project || !project.billable) {
            angular.element('#billable').parent().addClass('has-error');
            angular.element('#billable').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#billable').parent().removeClass('has-error');
            angular.element('#billable').siblings('.help-block').addClass('ng-hide');
        }
		
        if (!project || !project.active) {
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
			project.startDate = angular.element('#startdate').val();
			project.endDate = angular.element('#enddate').val();
			$scope.loading = true;
			$scope.message = "Please wait";
        	ProjectService.CreateProjects(project).then(ProjetsSuccess,ProjectsError);
        }
			
	}
	
	function ProjetsSuccess(response){
		
		if(response.status == 201 || response.status == 200){
			$scope.loading = false;
			$scope.success = true;
			$scope.project = {};
		    angular.element('#startdate').val("");
		    angular.element('#enddate').val("");
			$scope.successMessage = "Project successfully created";
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
	
  })
  .controller('CreateprojectTaskCtrl', function ($scope,ProjectService,$rootScope,$routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
    var token = JSON.parse(window.localStorage.getItem('TrustedToken'));

    if(typeof token == "undefined" || token == null){
  	  $location.path("/login");
    }

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
 