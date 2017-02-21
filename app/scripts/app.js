'use strict';

/**
 * @ngdoc overview
 * @name thapeloAssignmentApp
 * @description
 * # thapeloAssignmentApp
 *
 * Main module of the application.
 */
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
	'smart-table'
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
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
      })
      .when('/createEditproject', {
        templateUrl: 'views/createProject.html',
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
