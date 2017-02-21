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
	
	
	$scope.addMode = false;
	$scope.success = false;
	$scope.error = false;
	
    var existingproject = JSON.parse(window.localStorage.getItem('project'));
  
    if(typeof existingproject == "undefined" || existingproject == null){
		$scope.addMode = true;
    }
	
	// assigin values for edit mode
	if(!$scope.addMode){
		$scope.project = existingproject;
		if($scope.project.is_billable){
			document.getElementById("billtrue").selected = "true";
		}else{
			document.getElementById("billfalse").selected = "true";
		}
		if($scope.project.is_active){
			document.getElementById("is_activeTrue").selected = "true";
		}else{
			document.getElementById("is_activeFalse").selected = "true";
		}
	}

	
	$scope.save = function(project){
		
		if(project){
			project.is_billable = $("#billable").val();
			project.is_active = $("#active").val();
		}
	
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
			if($scope.addMode){
				console.log(project)
				ProjectService.CreateProjects(project).then(ProjectSuccess,ProjectsError);
			}else{
				project.start_date = angular.element('#startdate').val();
				project.end_date = angular.element('#enddate').val();
				
				console.log(project)
	        	ProjectService.EditProject(project).then(ProjectSuccess,ProjectsError);
			}
        	
        }
			
	}
	
	function ProjectSuccess(response){
		
		if(response.status == 201 || response.status == 200){
			$scope.loading = false;
			$scope.success = true;
			$scope.project = {};
		    angular.element('#startdate').val("");
		    angular.element('#enddate').val("");
			if($scope.addMode){
				$scope.successMessage = "Project successfully created";
			}else{
				$scope.successMessage = "Project successfully updated";
			}
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
