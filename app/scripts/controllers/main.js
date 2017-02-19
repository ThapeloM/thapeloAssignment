'use strict';

/**
 * @ngdoc function
 * @name thapeloAssignmentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the thapeloAssignmentApp
 */
angular.module('thapeloAssignmentApp')
  .controller('MainCtrl', function ($rootScope,$location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	window.localStorage.removeItem('TrustedToken');
	window.localStorage.removeItem('project');
	$rootScope.session = false;
	$location.path('/login');
  });
