'use strict';

/**
 * @ngdoc overview
 * @name thapeloAssignmentApp
 * @description
 * # thapeloAssignmentApp
 *
 * Main module of the application.
 */

var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; 
}]);
  
angular
  .module('thapeloAssignmentApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'alexjoffroy.angular-loaders',
	'smart-table',
	'underscore'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
	  .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/viewprojects.html',
        controller: 'ProjectsCtrl',
      })
      .when('/createEditproject', {
        templateUrl: 'views/createEditProject.html',
        controller: 'CreateprojectCtrl',
      })
      .when('/viewtasks', {
        templateUrl: 'views/viewTasks.html',
        controller: 'ViewtaskCtrl'
      })
      .when('/createtask', {
        templateUrl: 'views/createTask.html',
        controller: 'CreatetaskCtrl'
      })
      	.otherwise({
        redirectTo: '/'
      });
	  
});
