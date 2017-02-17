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
		
        if (!project || !project.startDate) {
            angular.element('#startdate').parent().addClass('has-error');
            angular.element('#startdate').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#startdate').parent().removeClass('has-error');
            angular.element('#startdate').siblings('.help-block').addClass('ng-hide');
        }
		
        if (!project || !project.endDate) {
            angular.element('#enddate').parent().addClass('has-error');
            angular.element('#enddate').siblings('.help-block').removeClass('ng-hide');
            hasErrors = true;
        } else {
            angular.element('#enddate').parent().removeClass('has-error');
            angular.element('#enddate').siblings('.help-block').addClass('ng-hide');
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
        	ProjectService.CreateProjects(project).then(ProjetsSuccess,ProjectsError);
        }
			
	}
	
	function ProjetsSuccess(response){
		
		if(response.status == 201 || response.status == 200){
			console.log(response);
		}else{
			console.log(response);
		}
		
	}
	
	function ProjectsError(error){
		console.log(error)
	}
	
  });
