'use strict';

describe('Controller: EditprojectCtrl', function () {

  // load the controller's module
  beforeEach(module('thapeloAssignmentApp'));

  var EditprojectCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditprojectCtrl = $controller('EditprojectCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditprojectCtrl.awesomeThings.length).toBe(3);
  });
});
