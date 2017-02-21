'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:EditprojectCtrl
 * @description
 * # EditprojectCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
  .controller('EditprojectCtrl', function (ProjectService, $scope, $location, $routeParams, $window, $rootScope) {
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
	
  });
