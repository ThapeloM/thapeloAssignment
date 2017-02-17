'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
  .controller('ProjectsCtrl', function (ProjectService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	ProjectService.Projects().then(ProjetsSuccess,ProjectsError);
	
	function ProjetsSuccess(response){
		console.log(response)
	}
	
	function ProjectsError(error){
		console.log(error)
	}
	
  });
