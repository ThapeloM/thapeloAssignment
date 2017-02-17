'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:CreateprojectCtrl
 * @description
 * # CreateprojectCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
  .controller('CreateprojectCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	
	
	$scope.save = function(project){
		
		console.log(project);
	}
  });
