'use strict';

/**
 * @ngdoc service
 * @name thapeloAssignmentApp.user.service
 * @description
 * # user.service
 * Service in the thapeloAssignmentApp.
 */
angular.module('thapeloAssignmentApp')
  .service('UserService', UserService);
   
    function UserService($http, $q) {
    	this.Login = Login;
	 	  
		function Login(userId, password) {
	        var dfd = $q.defer();
	        var clientId = user;
	        var clientSecret = 'tangent';
	        var request = {};
			var tokenUrl = "http://userservice.staging.tangentmicroservices.com:80/api-token-auth/"
          
			request.method = "post";
	        request.url = tokenUrl;
			request.data = {
				"username": userId, 
				"password": password
			};
		  
	        request.headers = {
	            "Content-Type": "application/json"
	        }

	        $http(request).then(function (response) {
	            var data = response.data;
                window.localStorage.setItem('TrustedToken', JSON.stringify(data));
	            dfd.resolve(data);
	        }, function (err) {
	            dfd.reject(err);
	        });

	        return dfd.promise;
        }
    }