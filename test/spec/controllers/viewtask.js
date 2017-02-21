'use strict';

describe('Controller: ViewtaskCtrl', function () {

  // load the controller's module
  beforeEach(module('thapeloAssignmentApp'));

  var ViewtaskCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewtaskCtrl = $controller('ViewtaskCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ViewtaskCtrl.awesomeThings.length).toBe(3);
  });
});
