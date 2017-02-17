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
		ProjectService.CreateProjects(project).then(ProjetsSuccess,ProjectsError);
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
