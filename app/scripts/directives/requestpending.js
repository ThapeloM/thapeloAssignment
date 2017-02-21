'use strict';

/**
 * @ngdoc directive
 * @name thapeloAssignmentApp.directive:requestPending
 * @description
 * # requestPending
 */
angular.module('thapeloAssignmentApp')
  .directive('requestPending', function ($interval) {
      return {
          restrict: "AE",
          require: "ngModel",
          templateUrl: 'views/partials/requestPending.html',
          scope: {
              ngModel: '=',
              message: '=?'
          },
          replace: true,
          link: function (scope, element, attrs) {
			        element.text('this is the requestPending directive');
					  
                var isLoading = function () {
                  return scope.ngModel;
                }
                var message = scope.message;

                var isLogin = function () {
                    return scope.login;
                }

                var Message = function () {
                    return scope.message;
                }

                var count = 1;
                scope.message = message + ".";

                var counting = function () {
                    var msg;
                    if (count == 0) {
                        count = 1;
                        scope.message = message;
                    } else if (count == 1) {
                        count = 2;
                        scope.message = message + ".";
                    } else if (count == 2) {
                        count = 3;
                        scope.message = message + "..";
                    } else {
                        count = 0;
                        scope.message = message + "...";
                    }
                    return scope.message;
                }

                var interval = $interval(counting, 500);

                scope.$watch(Message, function (value) {
                    if (value) {
                        scope.message = value;
                    }
                });

                scope.$watch(isLoading, function (value) {
                    if (value) {
                        scope.loading = true;
                    } else {
                        if (angular.isDefined(interval)) {
                            $interval.cancel(interval);
                            interval = undefined;
                        }
                        scope.loading = false;
                    }
                });
			}
        };
 })
