'use strict';

/**
 * @ngdoc service
 * @name thapeloAssignmentApp.project.service
 * @description
 * # project.service
 * Service in the thapeloAssignmentApp.
 */
angular.module('thapeloAssignmentApp')
.service('ProjectService', ProjectService);
	
	
	  // get list of projects
      function ProjectService($http, $q, $location) {
          this.Projects = Projects;
		  this.CreateProjects = CreateProjects;
		  
		  function Projects() {
			  
			  var token = JSON.parse(window.localStorage.getItem('TrustedToken'));
			  
			  if(typeof token == "undefined" || token == null){
			  	  $location.path("/login");
			   }
	          var dfd = $q.defer();
	          var request = {};
			  var url = "http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/"
 
			  request.method = "get";
	          request.url = url;
			  request.headers = {
				  	'content-type':'application/json',
			  		'Authorization':'Token ' + token.token
			  };

	          $http(request).then(function (response) {
	              var data = response.data;
                  console.log(data);
	              dfd.resolve(data);
	          }, function (err) {
	              dfd.reject(err);
	          });

	          return dfd.promise;
		}
		
  	  function CreateProjects(project) {
		  
  		  var token = JSON.parse(window.localStorage.getItem('TrustedToken'));
  		  if(typeof token == "undefined" || token == null){
  		  	  $location.path("/login");
  		   }
   		  var project = {
   			  title: project.title,
   			  description: project.description,
   			  start_date: project.startDate,
   			  end_date: project.endDate,
   			  is_billable: project.billable,
   			  is_active: project.active
   		  }
		  
            var dfd = $q.defer();
            var request = {};
  		    var url = "http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/"

  		  request.method = "post";
            request.url = url;
  		  request.headers = {
  			  	'content-type':'application/json',
  		  		'Authorization':'Token ' + token.token
  		  };
  		  request.data = project;

            $http(request).then(function (response) {
                var data = response;
                dfd.resolve(data);
            }, function (err) {
                dfd.reject(err);
            });

    		return dfd.promise;
  		}
	
	}
	
	

	
