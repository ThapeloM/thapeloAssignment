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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
	  .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
      })
      .when('/createproject', {
        templateUrl: 'views/createProject.html',
        controller: 'CreateprojectCtrl',
      })
      .when('/viewprojecttasks', {
        templateUrl: 'views/viewTasks.html',
        controller: 'ViewtaskCtrl'
      })
      .when('/editproject', {
        templateUrl: 'views/editProject.html',
        controller: 'EditprojectCtrl'
      })
      .when('/createtask', {
        templateUrl: 'views/createTask.html',
        controller: 'CreatetaskCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
	  
  });
