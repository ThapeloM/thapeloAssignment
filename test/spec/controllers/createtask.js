'use strict';

describe('Controller: CreatetaskCtrl', function () {

  // load the controller's module
  beforeEach(module('thapeloAssignmentApp'));

  var CreatetaskCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatetaskCtrl = $controller('CreatetaskCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreatetaskCtrl.awesomeThings.length).toBe(3);
  });
});
