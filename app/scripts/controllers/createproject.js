'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:CreateprojectCtrl
 * @description
 * # CreateprojectCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
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
	
  });
