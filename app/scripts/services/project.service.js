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
		  this.CreateTask = CreateTask;
		  this.DeleteProject = DeleteProject;
		  this.ViewTasks = ViewTasks;
		  this.EditProject = EditProject;
		  this.DeleteTask = DeleteTask;
		  
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
	              var data = response;
	              dfd.resolve(data);
	          }, function (err) {
	              dfd.reject(err);
	          });

	          return dfd.promise;
		}
		
		
		//create a project
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
		
		
  		//edit a project
    	function EditProject(project) {
		  
    		  var token = JSON.parse(window.localStorage.getItem('TrustedToken'));
    		  if(typeof token == "undefined" || token == null){
    		  	  $location.path("/login");
    		   }
     		  var project = {
				  pk: project.pk,
     			  title: project.title,
     			  description: project.description,
     			  start_date: project.start_date,
     			  end_date: project.end_date,
     			  is_billable: project.is_billable,
     			  is_active: project.is_active
     		  }
		  
              var dfd = $q.defer();
              var request = {};
    		    var url = "http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/" + project.pk + "/"

    		  request.method = "PUT";
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
		
		
		
		// add tasks to a project
    	function CreateTask(task) {
		  
    		  var token = JSON.parse(window.localStorage.getItem('TrustedToken'));
    		  if(typeof token == "undefined" || token == null){
    		  	  $location.path("/login");
    		   }
     		   var projecttask = {
     			  title: task.title,
     			  due_date: task.dueDate,
     			  estimated_hours: task.hours,
     			  project: task.pk,
     		    }
		  
              var dfd = $q.defer();
              var request = {};
    		    var url = "http://projectservice.staging.tangentmicroservices.com:80/api/v1/tasks/"

    		  request.method = "post";
              request.url = url;
    		  request.headers = {
    			  	'content-type':'application/json',
    		  		'Authorization':'Token ' + token.token
    		  };
    		  request.data = projecttask;

              $http(request).then(function (response) {
                  var data = response;
                  dfd.resolve(data);
              }, function (err) {
                  dfd.reject(err);
              });

      		return dfd.promise;
    	}
			
			
		// delete a project
	    function DeleteProject(id) {
		  
	    	var token = JSON.parse(window.localStorage.getItem('TrustedToken'));
	    	if(typeof token == "undefined" || token == null){
	    	 	  $location.path("/login");
	   	    }

	            var dfd = $q.defer();
	            var request = {};
	    		var url = "http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/" + id + "/";

	    		request.method = "delete";
	            request.url = url;
	    		request.headers = {
	    			  	'content-type':'application/json',
	    		  		'Authorization':'Token ' + token.token
	    		};

	            $http(request).then(function (response) {
	                var data = response;
	                dfd.resolve(data);
	            }, function (err) {
	                  dfd.reject(err);
	            });

	      		return dfd.promise;
	    }
		
		// add tasks to a project
    	function ViewTasks(projectID) {
		  
    		  var token = JSON.parse(window.localStorage.getItem('TrustedToken'));
    		  if(typeof token == "undefined" || token == null){
    		  	  $location.path("/login");
    		   }

              var dfd = $q.defer();
              var request = {};
    		  var url = "http://projectservice.staging.tangentmicroservices.com:80/api/v1/tasks/" + projectID +"/";

    		  request.method = "get";
              request.url = url;
    		  request.headers = {
    			  	'content-type':'application/json',
    		  		'Authorization':'Token ' + token.token
    		  };

              $http(request).then(function (response) {
                  var data = response;
                  dfd.resolve(data);
              }, function (err) {
                  dfd.reject(err);
              });

      		return dfd.promise;
    	}
		
		
		// add tasks to a project
	    function DeleteTask(id) {
		  
	    	var token = JSON.parse(window.localStorage.getItem('TrustedToken'));
	    	if(typeof token == "undefined" || token == null){
	    	 	  $location.path("/login");
	   	    }

	            var dfd = $q.defer();
	            var request = {};
	    		var url = "http://projectservice.staging.tangentmicroservices.com:80/api/v1/tasks/" + id + "/";

	    		request.method = "delete";
	            request.url = url;
	    		request.headers = {
	    			  	'content-type':'application/json',
	    		  		'Authorization':'Token ' + token.token
	    		};

	            $http(request).then(function (response) {
	                var data = response;
	                dfd.resolve(data);
	            }, function (err) {
	                  dfd.reject(err);
	            });

	      		return dfd.promise;
	    }
			
	
}
	
	

	
